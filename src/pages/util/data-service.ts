import { Injectable } from '@angular/core';
import { Restaurant, Table, Party, Employee, EmployeeShift } from '../util/classes';

@Injectable()
export class DataService {

	restaurant: Restaurant;

	constructor() {

		let owner = new Employee("Michael", "Fassbender", "Owner", 100000.01,
															2024561111, "../assets/imgs/mikefass.jpg", 1);
    this.restaurant = new Restaurant("Osteria Francescana", 6088060806, owner,
			"168 World's End St.", "Nowhere, NO, 99999", 1688);

    let tempEmployees =
    	[
				new Employee("Anna", "Schmidt", "Manager", 50.00, 6086076006,
										 "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg", 2),
				new Employee("Carl", "Robins", "Assistant Manager", 30.00, 6083456789,
										 "http://www.math.uni-frankfurt.de/~person/_4170854.jpg", 10),
				new Employee("Marianne", "Beaumont", "Hostess", 15.00, 9119119911,
										 "http://www.pearsonvue.com/pteprofessional/images/homepage.png"),
				new Employee("Phil", "Scott", "Bartender", 10.00, 6083104545,
										 "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Robert_gold_bartender.jpg/220px-Robert_gold_bartender.jpg"),
				new Employee("Kevin", "Anderson", "Server", 5.00, 6088067777,
										 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl"),
				new Employee("Daniel", "Radcliffe", "Server", 1.00, 7299389920,
										 "https://img.buzzfeed.com/buzzfeed-static/static/2018-01/12/14/asset/buzzfeed-prod-fastlane-03/sub-buzz-18898-1515786282-5.jpg?downsize=715:*&output-format=auto&output-quality=auto"),
				new Employee("Arnold", "Schwarznegger", "Cook", 9999.99, 9999999999,
										 "https://upload.wikimedia.org/wikipedia/commons/1/10/Arnold_Schwarzenegger_September_2017.jpg"),
				new Employee("Kevin", "Spacey", "Server", 0.01, 8299291834,
										 "https://www.gannett-cdn.com/-mm-/cafa601533d164e1a938fceb66dbd9ba7dec8622/c=1252-527-2956-1808&r=x404&c=534x401/local/-/media/2017/11/08/USATODAY/USATODAY/636457309000424528-XXX-AFP-TZ54V-95172455.JPG"),
				new Employee("Anthony", "Hopkins", "Bartender", 50.00, 7144969596,
										 "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MDAxMDczMTY3/sir-anthony-hopkins-9343556-1-402.jpg"),
				new Employee("Cara", "Delevingne", "Server", 15.00, 6783859873,
										 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLg8W3_tJ--QpQhPQjFglY9G-Tu9pCyWV-5UR8FLe4lFGXJhE"),
				new Employee("Kameron", "Young", "Server", 5.00, 6088067777,
										 "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/13077027_1318802494800331_7760229749495766368_n.jpg?_nc_cat=0&oh=86e592e3eea0db57911dc21527f25dec&oe=5B965C90"),
				new Employee("Casey", "Nitz", "Server", 5.00, 6088067777,
										 "https://scontent-ort2-1.xx.fbcdn.net/v/t31.0-8/1511827_792745014132756_977096387972296994_o.jpg?_nc_cat=0&oh=b31aba57dc71c510bb519eb13c1a1108&oe=5B8EF421"),
				new Employee("Suzy", "Kong", "Server", 5.00, 6088067777,
										 "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/27073417_1873106099611377_6868467175191870057_n.jpg?_nc_cat=0&oh=61fe7c000239c0767dd7975c790defd0&oe=5B902065"),
				new Employee("Jimmie", "Plautz", "Server", 5.00, 6088067777,
										 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKzL4WtUsWpaDI_PkYH01KiEEwByV8JDplXwvdvJfrnEYa330"),
				new Employee("Kass", "Chupongstimun", "Server", 5.00, 6088067777,
										 "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/29570700_1895844113789958_947715976665000958_n.jpg?_nc_cat=0&oh=2b736c14194f3e72574a68df67838e69&oe=5B9D77DD"),
				new Employee("Tina", "Russo", "Head Chef", 500.00, 4149217439,
										 "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg"),
				new Employee("Bryan", "Suzan", "DJ", 0.03, 6666666666, "../../assets/imgs/bryan.jpg")
			];

			let tempTables = [
										new Table(4, "20", "20"), new Table(4, "150", "20"),
										new Table(6, "280", "20"), new Table(2, "410", "20"),
										new Table(8, "540", "20"), new Table(7, "670", "20"),
										new Table(2, "20", "150"), new Table(2, "150", "150"),
										new Table(4, "280", "150"), new Table(4, "410", "150"),
										new Table(8, "540", "150"), new Table(10, "670", "150"),
										new Table(4, "20", "280"), new Table(6, "150", "280"),
										new Table(12, "280", "280"), new Table(1, "410", "280"),
										new Table(14, "540", "280"), new Table(4, "670", "280")
									];
			let tempParties = [
										 new Party("Kass", 7, "04:20", 6086095186, true),
										 new Party("Kameron", 2, "18:15", 5065065006, false),
										 new Party("Jimmie", 3, "21:01", 9999999999, false),
										 new Party("Suzy", 1000, "09:00", 1234567890, false),
										 new Party("Casey", 4, "05:55", 6667778888, true),
										 new Party("Pete", 7, "05:54", 6969696969, false),
										 new Party("Kay", 2, "00:59", 7773331111, false),
										 new Party("Magaret", 4, "05:20", 9099099900, true),
										 new Party("Joyce", 3, "05:55", 4156937782, false),
										 new Party("Ivan", 10, "11:59", 4526565665, false),
										 new Party("Jason", 12, "11:59", 3848892467, false),
										 new Party("Ben", 5, "00:00", 5555555555, true),
										 new Party("Issac", 6, "23:59", 9876543210, true),
										 new Party("Leslie", 6, "24:59", 9119119911, false)
									 ];

			var i;
			for (i = 0; i < tempEmployees.length; i++) {
				this.restaurant.employees.push(tempEmployees[i]);
			}
			for (i = 0; i < tempTables.length; i++) {
				this.restaurant.tables.push(tempTables[i]);
			}
			for (i = 0; i < tempParties.length; i++) {
				this.restaurant.parties.push(tempParties[i]);
			}

			this.restaurant.employees[17].shifts = [
																new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Bryan Suzan"),
																new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Bryan Suzan"),
																new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("04/20/2018 04:20", "04/20/2018 14:20", "Bryan Suzan"),
																new EmployeeShift("04/21/2018 00:20", "04/21/2018 01:54", "Bryan Suzan"),
																new EmployeeShift("02/01/2018 06:01", "02/01/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("02/02/2018 07:01", "02/02/2018 07:15", "Bryan Suzan"),
																new EmployeeShift("02/14/2018 08:01", "02/14/2018 09:30", "Bryan Suzan"),
																new EmployeeShift("04/01/2018 18:01", "04/02/2018 18:00", "Bryan Suzan"),
																new EmployeeShift("04/20/2018 04:21", "04/20/2018 14:20", "Bryan Suzan"),
																new EmployeeShift("04/21/2018 00:21", "04/21/2018 01:54", "Bryan Suzan"),
																new EmployeeShift("04/22/2018 07:01", undefined, "Bryan Suzan")
															 ];
		this.restaurant.employees[2].shifts = [
																new EmployeeShift("02/01/2018 00:00", "02/01/2018 23:59", "Carl Robins"),
																new EmployeeShift("02/02/2018 23:45", "02/03/2018 00:15", "Carl Robins"),
																new EmployeeShift("02/11/2018 08:13", "02/14/2018 13:22", "Carl Robins"),
																new EmployeeShift("04/20/2018 18:00", "04/02/2018 18:00", "Carl Robins"),
																new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Carl Robins")
															 ];
		this.restaurant.employees[3].shifts = [
																new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Marianne Beaumont"),
																new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Marianne Beaumont"),
																new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Marianne Beaumont"),
																new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Marianne Beaumont"),
																new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Marianne Beaumont")
															 ];
		this.restaurant.employees[1].shifts = [
																new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Anna Schmidt"),
																new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Anna Schmidt"),
																new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Anna Schmidt"),
																new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Anna Schmidt"),
																new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Anna Schmidt")
															 ];
	}

	getRestaurant(): Restaurant {
		return this.restaurant;
	}


}