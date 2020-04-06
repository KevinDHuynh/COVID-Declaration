<?php
$connect = mysqli_connect("localhost", "root", "wit123", "covid_declaration");
$error = mysqli_connect_error();
//Display error if cannot connect to database
if ($error != null) {
    $output = "<p>Uable to connect to database</p>" . $error;
    exit($output);
}
?>

<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style2.css">
</head>

<body>
    <div class="main">
        <img src="images/tsabanner.png" alt="TSA logo" /></a><br /><br />
        <div class="container">

            <div class="tab">
                <button id= "overview-tab" class="tablinks" onclick="showTableContent(event, 'graphs')" >Overview</button>
                <button id= "passenger-tab"  class="tablinks" onclick="showTableContent(event, 'passenger')">Passenger</button>
            </div>
            <!-- Overview: Graphs -->
            <div id="graphs" class="tabcontent">
                <h2>Health Decalaration Overview</h2>
                <table class="columns">
                    <tr>
                        <td>
                            <div id="piechart_div" style="border: 1px solid #ccc"></div>
                        </td>
                        <td>
                            <div id="barchart_div" style="border: 1px solid #ccc"></div>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Passenger: search field -->
            <div id="passenger" class="tabcontent">
                <h2>Search Passenger </h2>
                <form id="search-form" method="POST">
                    <fieldset>
                        <p>Please enter passenger's last name or passport number</p>
                        <input type="text" name="search" placeholder="Enter search string..." />
                        <input type="submit" name="submit" value="Search" />
                    </fieldset>
                </form><br />
                <!-- Passenger: Table -->
                <div>
                    <div id="table_div">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
    
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <!-- Table -->
    <script type="text/javascript">
                        google.charts.load('current', {
                            'packages': ['table']
                        });
                        google.charts.setOnLoadCallback(drawTable);
                        
                        function drawTable() {
                            var data = new google.visualization.DataTable();
                            data.addColumn('string', 'First Name');
                            data.addColumn('string', 'Last Name');
                            data.addColumn('string', 'Passport Number');
                            data.addColumn('string', 'Nationality');
                            data.addColumn('boolean', 'Visited China');
                            data.addColumn('boolean', 'Visited Restricted Regions');
                            data.addColumn('boolean', 'Cough');
                            data.addColumn('boolean', 'Fever');
                            data.addColumn('boolean', 'Difficulty Breathing');
                            data.addColumn('string', 'Email');

                            data.addRows([
                                <?php
                                if (isset($_POST['search'])) {
                                    $searchQuery = $_POST['search'];
                                    $sql = "Select 
                                                    firstName,
                                                    lastName,
                                                    passportNo, 
                                                    nationality,
                                                    if(inChina,'true','false')inChina,
                                                    if(inRegions,'true','false')inRegions, 
                                                    if(cough,'true','false') cough,
                                                    if(fever,'true','false')fever, 
                                                    if(difficultyBreathing,'true','false')difficultyBreathing,
                                                    email
                                                from 
                                                    passenger 
                                                WHERE passportNo LIKE '%$searchQuery%'OR LastName LIKE '%$searchQuery%'";
                                    $result = mysqli_query($connect, $sql);
                                    if ($result->num_rows > 0) {
                                        while ($row = mysqli_fetch_array($result)) {
                                            echo "[
                                                 '" . $row["firstName"] . "','" . $row["lastName"] . "','" . $row["passportNo"] . "','" . $row["nationality"] . "',
                                                 " . $row["inChina"] . "," . $row["inRegions"] . ", " . $row["cough"] . "," . $row["fever"] . "," . $row["difficultyBreathing"] . ",
                                                 '" . $row["email"] . "'
                                                ], ";
                                        }
                                    } else {
                                        echo "No search results!";
                                    }
                                }
                                ?>
                            ]);

                            var table = new google.visualization.Table(document.getElementById('table_div'));
                            //alert("graph: "+document.getElementById("graphs").style.display)
                            //alert("passenger: "+document.getElementById("passenger").style.display)
                            table.draw(data, {
                                showRowNumber: true,
                                width: '100%',
                                height: '500'
                            });
                            
                        }
                        
                    </script>   
    <!-- Chart -->
    <script type="text/javascript">
        // Load Charts and the corechart and barchart packages.
        google.charts.load('current', {
            'packages': ['corechart']
        });

        // Draw the pie chart and bar chart when Charts is loaded.
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable([
                ['Gender', 'Number'],
                <?php
                $sql = "SELECT COUNT(passengerID) AS number, gender FROM passenger GROUP BY gender";
                $result = mysqli_query($connect, $sql);
                if ($result->num_rows > 0) {
                    while ($row = mysqli_fetch_array($result)) {
                        echo "['" . $row["gender"] . "', " . $row["number"] . "],";
                    }
                } else {
                    echo "0 results";
                }
                ?>
            ]);

            var piechart_options = {
                title: 'Gender Distribution of U.S Travelers',
                is3D: true,
                width: 550,
                height: 400
            };

            var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
            piechart.draw(data, piechart_options);

            //draw barchart
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Nationality');
            data.addColumn('number', 'Number');
            data.addRows([
                <?php
                $sql = "SELECT COUNT(passengerID) AS number, nationality FROM passenger GROUP BY nationality";
                $result = mysqli_query($connect, $sql);
                if ($result->num_rows > 0) {
                    while ($row = mysqli_fetch_array($result)) {
                        echo "['" . $row["nationality"] . "', " . $row["number"] . "],";
                    }
                } else {
                    echo "0 results";
                }
                ?>
            ]);

            var barchart_options = {
                title: 'Demographics of U.S Travelers',
                width: 550,
                height: 400,
                legend: 'none'
            };
            var barchart = new google.visualization.BarChart(document.getElementById('barchart_div'));
            barchart.draw(data, barchart_options);
        }
    </script>
    
</body>

</html>