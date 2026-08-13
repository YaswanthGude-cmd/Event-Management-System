<html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>ANITS Student Dashboard</title>

    <!-- React -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background-color: #f4f6f9;
            color: #333;
        }

        /* =========================
           MAIN LAYOUT
        ========================= */

        .dashboard {
            display: flex;
            min-height: 100vh;
        }


        /* =========================
           SIDEBAR
        ========================= */

        .sidebar {
            width: 250px;
            background-color: #12355b;
            color: white;
            padding: 25px 15px;
            position: fixed;
            height: 100vh;
            left: 0;
            top: 0;
        }

        .college-logo {
            text-align: center;
            margin-bottom: 30px;
        }

        .college-logo img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: white;
            object-fit: contain;
        }

        .college-logo h2 {
            margin-top: 10px;
            font-size: 20px;
        }

        .college-logo p {
            font-size: 12px;
            margin-top: 5px;
        }


        /* Sidebar Menu */

        .menu {
            list-style: none;
        }

        .menu li {
            margin: 8px 0;
        }

        .menu button {
            width: 100%;
            border: none;
            background: transparent;
            color: white;
            text-align: left;
            padding: 13px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 15px;
        }

        .menu button:hover {
            background-color: #1d5d91;
        }

        .menu button.active {
            background-color: #ffd166;
            color: #12355b;
            font-weight: bold;
        }


        /* =========================
           MAIN CONTENT
        ========================= */

        .main {
            margin-left: 250px;
            width: calc(100% - 250px);
            min-height: 100vh;
        }


        /* =========================
           TOP BAR
        ========================= */

        .topbar {
            background-color: white;
            padding: 18px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .topbar h2 {
            color: #12355b;
        }

        .student-name {
            font-weight: bold;
        }


        /* =========================
           CONTENT
        ========================= */

        .content {
            padding: 30px;
        }

        .welcome {
            background-color: #12355b;
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin-bottom: 25px;
        }

        .welcome h1 {
            margin-bottom: 10px;
        }


        /* =========================
           CARDS
        ========================= */

        .cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .card {
            background-color: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .card h3 {
            color: #666;
            font-size: 15px;
            margin-bottom: 10px;
        }

        .card h2 {
            color: #12355b;
            font-size: 30px;
        }

        .card p {
            margin-top: 8px;
            font-size: 13px;
        }


        /* =========================
           SECTIONS
        ========================= */

        .section {
            background-color: white;
            padding: 25px;
            margin-bottom: 25px;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.08);
        }

        .section h2 {
            color: #12355b;
            margin-bottom: 20px;
        }


        /* =========================
           TABLE
        ========================= */

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 14px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #12355b;
            color: white;
        }


        /* =========================
           PROGRESS BAR
        ========================= */

        .progress {
            width: 100%;
            height: 10px;
            background-color: #ddd;
            border-radius: 10px;
            margin-top: 8px;
        }

        .progress-bar {
            height: 100%;
            background-color: #2a9d8f;
            border-radius: 10px;
        }


        /* =========================
           BUTTON
        ========================= */

        .btn {
            padding: 9px 16px;
            border: none;
            background-color: #12355b;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #1d5d91;
        }


        /* =========================
           EVENT
        ========================= */

        .event {
            padding: 15px;
            border-left: 5px solid #12355b;
            margin-bottom: 15px;
            background-color: #f5f7fa;
        }

        .event h3 {
            color: #12355b;
            margin-bottom: 5px;
        }


        /* =========================
           PROFILE
        ========================= */

        .profile {
            display: flex;
            gap: 25px;
            align-items: center;
        }

        .profile-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #12355b;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 35px;
            font-weight: bold;
        }

        .profile-info p {
            margin: 8px 0;
        }


        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 1000px) {

            .cards {
                grid-template-columns: repeat(2, 1fr);
            }

        }

        @media (max-width: 700px) {

            .sidebar {
                width: 70px;
                padding: 15px 8px;
            }

            .college-logo h2,
            .college-logo p {
                display: none;
            }

            .college-logo img {
                width: 45px;
                height: 45px;
            }

            .menu button {
                font-size: 0;
                text-align: center;
            }

            .menu button::first-letter {
                font-size: 20px;
            }

            .main {
                margin-left: 70px;
                width: calc(100% - 70px);
            }

            .cards {
                grid-template-columns: 1fr;
            }

            .content {
                padding: 15px;
            }

            table {
                font-size: 12px;
            }

            .topbar {
                padding: 15px;
            }

        }

    </style>
</head>


<body>

<div id="root"></div>


<script type="text/babel">

    const { useState } = React;


    /* =========================
       SIDEBAR
    ========================= */

    function Sidebar({ activePage, setActivePage }) {

        const menuItems = [
            "🏠 Dashboard",
            "📚 Courses",
            "📊 Attendance",
            "📝 Assignments",
            "📅 Events",
            "🔔 Notifications",
            "👤 Profile"
        ];

        return (

            <div className="sidebar">

                <div className="college-logo">

                    <!-- Replace with your ANITS logo -->

                    <img
                        src="anits-logo.png"
                        alt="ANITS Logo"
                    />

                    <h2>ANITS</h2>

                    <p>Student Portal</p>

                </div>


                <ul className="menu">

                    {menuItems.map((item) => (

                        <li key={item}>

                            <button
                                className={
                                    activePage === item
                                    ? "active"
                                    : ""
                                }

                                onClick={() =>
                                    setActivePage(item)
                                }
                            >

                                {item}

                            </button>

                        </li>

                    ))}

                </ul>

            </div>

        );
    }



    /* =========================
       DASHBOARD HOME
    ========================= */

    function DashboardHome() {

        return (

            <>

                <div className="welcome">

                    <h1>
                        Welcome, Maneesha! 👋
                    </h1>

                    <p>
                        Have a great day and keep learning.
                    </p>

                </div>


                <div className="cards">

                    <div className="card">

                        <h3>Attendance</h3>

                        <h2>85%</h2>

                        <div className="progress">

                            <div
                                className="progress-bar"
                                style={{ width: "85%" }}
                            ></div>

                        </div>

                    </div>


                    <div className="card">

                        <h3>Courses</h3>

                        <h2>6</h2>

                        <p>Active courses</p>

                    </div>


                    <div className="card">

                        <h3>Assignments</h3>

                        <h2>4</h2>

                        <p>Pending assignments</p>

                    </div>


                    <div className="card">

                        <h3>Events</h3>

                        <h2>3</h2>

                        <p>Upcoming events</p>

                    </div>

                </div>


                <div className="section">

                    <h2>Today's Schedule</h2>

                    <table>

                        <thead>

                            <tr>
                                <th>Time</th>
                                <th>Subject</th>
                                <th>Room</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td>09:00 AM</td>
                                <td>Machine Learning</td>
                                <td>Lab 1</td>
                            </tr>

                            <tr>
                                <td>11:00 AM</td>
                                <td>DBMS</td>
                                <td>Room 204</td>
                            </tr>

                            <tr>
                                <td>02:00 PM</td>
                                <td>Web Development</td>
                                <td>Lab 3</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </>

        );

    }



    /* =========================
       COURSES
    ========================= */

    function Courses() {

        const courses = [
            ["Machine Learning", "CSE-AIML"],
            ["Database Management System", "CSE-AIML"],
            ["Web Development", "CSE-AIML"],
            ["Computer Networks", "CSE-AIML"],
            ["Artificial Intelligence", "CSE-AIML"],
            ["Java Programming", "CSE-AIML"]
        ];

        return (

            <div className="section">

                <h2>My Courses</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Course</th>
                            <th>Branch</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {courses.map((course) => (

                            <tr key={course[0]}>

                                <td>{course[0]}</td>

                                <td>{course[1]}</td>

                                <td>
                                    <button className="btn">
                                        Active
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        );

    }



    /* =========================
       ATTENDANCE
    ========================= */

    function Attendance() {

        const subjects = [
            ["Machine Learning", 90],
            ["DBMS", 85],
            ["Web Development", 92],
            ["Computer Networks", 78],
            ["Artificial Intelligence", 88]
        ];

        return (

            <div className="section">

                <h2>Attendance</h2>

                {subjects.map((subject) => (

                    <div
                        key={subject[0]}
                        style={{
                            marginBottom: "20px"
                        }}
                    >

                        <strong>
                            {subject[0]}
                        </strong>

                        <span style={{
                            float: "right"
                        }}>
                            {subject[1]}%
                        </span>


                        <div className="progress">

                            <div
                                className="progress-bar"
                                style={{
                                    width: subject[1] + "%"
                                }}
                            ></div>

                        </div>

                    </div>

                ))}

            </div>

        );

    }



    /* =========================
       ASSIGNMENTS
    ========================= */

    function Assignments() {

        const assignments = [
            ["Machine Learning", "Classification Algorithm", "20 Aug"],
            ["DBMS", "Normalization", "22 Aug"],
            ["Web Development", "React Project", "25 Aug"],
            ["AI", "Minimax Algorithm", "28 Aug"]
        ];

        return (

            <div className="section">

                <h2>Assignments</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Subject</th>
                            <th>Assignment</th>
                            <th>Due Date</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {assignments.map((item) => (

                            <tr key={item[1]}>

                                <td>{item[0]}</td>

                                <td>{item[1]}</td>

                                <td>{item[2]}</td>

                                <td>
                                    <button
                                        className="btn"
                                        onClick={() =>
                                            alert(
                                                "Assignment opened!"
                                            )
                                        }
                                    >
                                        View
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        );

    }



    /* =========================
       EVENTS
    ========================= */

    function Events() {

        return (

            <div className="section">

                <h2>Upcoming Events</h2>


                <div className="event">

                    <h3>ANITS Tech Fest</h3>

                    <p>
                        📅 August 20, 2026
                    </p>

                    <p>
                        Coding competitions and technical events.
                    </p>

                </div>


                <div className="event">

                    <h3>AI & ML Workshop</h3>

                    <p>
                        📅 September 15, 2026
                    </p>

                    <p>
                        Learn Artificial Intelligence and Machine Learning.
                    </p>

                </div>


                <div className="event">

                    <h3>Cultural Fest</h3>

                    <p>
                        📅 September 25, 2026
                    </p>

                    <p>
                        Music, dance and cultural programs.
                    </p>

                </div>

            </div>

        );

    }



    /* =========================
       NOTIFICATIONS
    ========================= */

    function Notifications() {

        return (

            <div className="section">

                <h2>Notifications</h2>

                <div className="event">

                    <h3>Assignment Reminder</h3>

                    <p>
                        DBMS assignment submission is due soon.
                    </p>

                </div>


                <div className="event">

                    <h3>Workshop Registration</h3>

                    <p>
                        AI & ML workshop registration is open.
                    </p>

                </div>


                <div className="event">

                    <h3>Exam Notice</h3>

                    <p>
                        Internal examinations schedule will be
                        announced soon.
                    </p>

                </div>

            </div>

        );

    }



    /* =========================
       PROFILE
    ========================= */

    function Profile() {

        return (

            <div className="section">

                <h2>Student Profile</h2>


                <div className="profile">

                    <div className="profile-img">
                        M
                    </div>


                    <div className="profile-info">

                        <p>
                            <strong>Name:</strong>
                            {" "}Maneesha
                        </p>

                        <p>
                            <strong>College:</strong>
                            {" "}ANITS
                        </p>

                        <p>
                            <strong>Branch:</strong>
                            {" "}CSE (AI & ML)
                        </p>

                        <p>
                            <strong>Year:</strong>
                            {" "}3rd Year
                        </p>

                        <p>
                            <strong>Email:</strong>
                            {" "}student@anits.edu.in
                        </p>

                    </div>

                </div>

            </div>

        );

    }



    /* =========================
       MAIN APP
    ========================= */

    function App() {

        const [activePage, setActivePage] =
            useState("🏠 Dashboard");


        function renderPage() {

            switch (activePage) {

                case "📚 Courses":
                    return <Courses />;

                case "📊 Attendance":
                    return <Attendance />;

                case "📝 Assignments":
                    return <Assignments />;

                case "📅 Events":
                    return <Events />;

                case "🔔 Notifications":
                    return <Notifications />;

                case "👤 Profile":
                    return <Profile />;

                default:
                    return <DashboardHome />;

            }

        }


        return (

            <div className="dashboard">


                <Sidebar
                    activePage={activePage}
                    setActivePage={setActivePage}
                />


                <main className="main">


                    <div className="topbar">

                        <h2>
                            Student Dashboard
                        </h2>

                        <span className="student-name">
                            Maneesha | CSE (AI & ML)
                        </span>

                    </div>


                    <div className="content">

                        {renderPage()}

                    </div>


                </main>

            </div>

        );

    }



    /* =========================
       REACT RENDER
    ========================= */

    const root =
        ReactDOM.createRoot(
            document.getElementById("root")
        );

    root.render(<App />);

</script>

</body>
</html>
```
