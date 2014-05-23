var speed = 3.0;  //Швидкість руху робота
var rotationSpeed = 5.0; //Швидкість повороту робота
var shootRange = 15.0;  //Діапазон пострілу
var attackRange = 30.0; //Діапазон атаки(починає бігти на зустріч до shootRange)
var shootAngle = 4.0;  // Допустимий кут між мішенню для пострілу
var dontComeCloserRange = 5.0;  // Діапазано мінімальної відстані між роботом і гравцем
var delayShootTime = 0.35;  //Затримка часу пострілу
var pickNextWaypointDistance = 2.0; //Відстань до наступної точки руху
var target : Transform; //Зміна цілі

private var lastShot = -10.0;  //Час останнього пострілу

// Make sure there is always a character controller
//Перевіряє на наявність скрипту, обовязково для character controller
@script RequireComponent (CharacterController)

function Start () {
	// Auto setup player as target through tags
	//Зразу цілі немає, і шукається обєкт Гравець
	if (target == null && GameObject.FindWithTag("Player"))
	//Як обєкт гравець знайдений зміна його позиції тобто він сам і де він є це і є ціль
		target = GameObject.FindWithTag("Player").transform;
//Виклик функції патрулювання
	Patrol();
}
//Функція яка змушує робота патрулювати територію
function Patrol () {
//Обєкт партурулює тільки в закритій WayPoint ами території
	var curWayPoint = AutoWayPoint.FindClosest(transform.position);
	//Якщо точки замкнуті то
	while (true) {
	//Якщо точки замкнуті то рухаємось до точки
		var waypointPosition = curWayPoint.transform.position;
		// Are we close to a waypoint? -> pick the next one!
		//Якщо точка ще не наступила то рухаемось далі до неї
		if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance)
		//Якщо робот дістався точки то рухаємось до наступної
			curWayPoint = PickNextWaypoint (curWayPoint);

		// Attack the player and wait until
		// - player is killed
		// - player is out of sight
		//Якщо робот "бачить" ціль то виликається фунція і починається або рух до нього або вогонь		
		if (CanSeeTarget ())
			yield StartCoroutine("AttackPlayer");
		
		// Move towards our target
		//Рух до цілі
		MoveTowards(waypointPosition);
		//Повертаємось знову до бачення цілі
		yield;
	}
}

//Сама функція яка визначає чи бачить робот ціль(булева)
function CanSeeTarget () : boolean {
//Перевірка якщо дистанція більша за attackRange (Допустиму для атаки)
	if (Vector3.Distance(transform.position, target.position) > attackRange)
	//Якщо віндстань не допустима для руху до обєкта і атаки то false
		return false;
	//Змінна можливо напрямок на обэкт	???????????????????????????????????????????????????????????????????????
	var hit : RaycastHit;
	//Якщо "Physics.Linecast" каже що обєкт в зоні дії то він стає активною ціллю
	//І вираховуються його кординати, видимість, і зміна руху
	if (Physics.Linecast (transform.position, target.position, hit))
	//Повертає значення зміни позиції цілі
		return hit.transform == target;
		//Інакеше робот ціль "небачить"
	return false;
}
//Функція пострілу
function Shoot () {
	// Start shoot animation
	animation.CrossFade("shoot", 0.3);

	// Wait until half the animation has played
	//Чекають доки половина анімації завантажиться і чекають до затримки часу пострілу
	yield WaitForSeconds(delayShootTime);
	
	// Fire gun
	//Безпосередньо повідомлення про постріл зі зброї
//	BroadcastMessage("Fire");
	
	// Wait for the rest of the animation to finish
	//Чекати доки не закінчиться анімація для самого пострілу
	//Вираховується довжина анімації - затримка пострілу для визначення середнього часу (вроді)
	yield WaitForSeconds(animation["shoot"].length - delayShootTime);
}
//Функція атаки по гравцю
function AttackPlayer () {
//Остання точка в якій був видний гравець, стає позиція цілі
	var lastVisiblePlayerPosition = target.position;
	//Якщо така точка була то правда
	while (true) {
		if (CanSeeTarget ()) {
			// Target is dead - stop hunting
			//Ціль померла зупинити полювання
			if (target == null)
				return;

			// Target is too far away - give up	
			//Ціль занадто далеко забути про неї
			//Вираховується дистанція до цілі якщо вона в 3 рази більша за діапазон атаки то забути
			var distance = Vector3.Distance(transform.position, target.position);
			if (distance > shootRange * 3)
				return;
			
			//Остання видима позиція гравця це позиція цілі
			lastVisiblePlayerPosition = target.position;
			//Якщо дистанція між гравцем і роботом більша ніж мінімально допустима для атаки то
			if (distance > dontComeCloserRange)
			//То рухатись до останньої точки де був помічений гравець
				MoveTowards (lastVisiblePlayerPosition);
			else
			//Інакше повернутися до точки де його бачили в останнє
				RotateTowards(lastVisiblePlayerPosition);
			
			//Після повороту в сторону гравця змінити свій основний напрямок на напрямок "Прямо" тобто
			//там де був останнє помічений гравець
			var forward = transform.TransformDirection(Vector3.forward);
			//Головна ціль вираховується = остання точка де помічений гравець в зоні видимості
			// відняти зміну його останньої позиції
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			//Зміна позиції по осі оу не враховується
			targetDirection.y = 0;
			//Змінна кут вираховується позиція головної цілі і напрямку руху робота
			var angle = Vector3.Angle(targetDirection, forward);

			// Start shooting if close and play is in sight
			//Якщо дистанція між роботом і обєктом менша за дистанцію атаки і кут між роботом і гравцем
			// менший за допустимий для ведення вогню
			if (distance < shootRange && angle < shootAngle)
			//то викликається функція яка проводить постріл
				yield StartCoroutine("Shoot");
		} else {
		//Інакше вмикається функція яка шукає об*єкт за його останньою позицією
			yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop attacking
			//Якщо гравця невидно більше то атак припиняється
			if (!CanSeeTarget ())
				return;
		}

		yield;
	}
}
//Функція пошуку гравця
function SearchPlayer (position : Vector3) {
	// Run towards the player but after 3 seconds timeout and go back to Patroling
	//Змінна скільки часу бігти в сторону гравця для пошуку
	var timeout = 3.0;
	//Рухаємось в сторону гравця(Шукаємо його) доки не пройде 3 секунди
	while (timeout > 0.0) {
		MoveTowards(position);


		// We found the player
		//Після цього гравець загублений
		if (CanSeeTarget ())
			return;

		timeout -= Time.deltaTime;
		yield;
	}
}
//Поворот напрямку  
function RotateTowards (position : Vector3) {
	//SendMessage("SetSpeed", 0.0);
	//Змінна яка вказує на головну траекторію руху, позиція відняти зміну позиції в данний момент
	var direction = (position - transform.position);
	//Змінна позиції по висоті не враховується
	direction.y = 0;
	//Можливо похибка кінцевого пункту руху
	if (direction.magnitude < 0.1)
		return;
	
	// Rotate towards the target
	//Поворот руху до цілі
	//Визначається в кватеріонах(зміна повороту робота, поворот зору до головної цілі,швидкість повороту робота * на час щоб було плавно)))
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	//Зміна кута Ейлера тут використовується зміна позиції гравця по у 
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}
//Функція визначає куди далі рухатись
function MoveTowards (position : Vector3) {
//перевизначає головний шлях
	var direction = position - transform.position;
	direction.y = 0;
	
	//допускається більша похибка в куті
	if (direction.magnitude < 0.5) {
		SendMessage("SetSpeed", 0.0);
		return;
	}
	
	// Rotate towards the target
	//Визначає кут зміни напрямку до цілі
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);

	// Move the character 
	//Безпосередньо сам рух за параметрами обєкта
	direction = forward * speed * speedModifier;
	GetComponent (CharacterController).SimpleMove(direction);
	
	SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}
//Функція яка заставляє бігти від одного wayPointa до наступного циклічно
function PickNextWaypoint (currentWaypoint : AutoWayPoint) {
	// We want to find the waypoint where the character has to turn the least

	// The direction in which we are walking
	var forward = transform.TransformDirection(Vector3.forward);

	// The closer two vectors, the larger the dot product will be.
	var best = currentWaypoint;
	var bestDot = -10.0;
	for (var cur : AutoWayPoint in currentWaypoint.connected) {
		var direction = Vector3.Normalize(cur.transform.position - transform.position);
		var dot = Vector3.Dot(direction, forward);
		if (dot > bestDot && cur != currentWaypoint) {
			bestDot = dot;
			best = cur;
		}
	}
	
	return best;
}