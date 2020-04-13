-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2020 at 01:28 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covid_declaration`
--

-- --------------------------------------------------------

--
-- Table structure for table `flight`
--

CREATE TABLE `flight` (
  `flightID` int(32) NOT NULL,
  `origin` varchar(3) NOT NULL,
  `destination` varchar(3) NOT NULL,
  `stopNo` int(1) NOT NULL,
  `passengerID` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `flight`
--

INSERT INTO `flight` (`flightID`, `origin`, `destination`, `stopNo`, `passengerID`) VALUES
(11233, 'CLT', 'BOS', 0, 6),
(12434, 'ORD', 'BOS', 0, 4),
(21331, 'BOS', 'JFK', 0, 1),
(35730, 'JFK', 'SEA', 2, 3),
(44444, 'LAX', 'DOV', 1, 2),
(55555, 'LAS', 'MIA', 0, 9),
(66666, 'PHX', 'BOS', 0, 10),
(77777, 'MIA', 'BOS', 0, 8),
(88888, 'EWR', 'SFO', 1, 7),
(98089, 'DFW', 'BOS', 0, 5);

-- --------------------------------------------------------

--
-- Table structure for table `layover`
--

CREATE TABLE `layover` (
  `layoverID` int(11) NOT NULL,
  `flightID` int(32) NOT NULL,
  `stopNo` int(11) NOT NULL,
  `origin` varchar(3) NOT NULL,
  `destination` varchar(3) NOT NULL,
  `flightNo` int(9) NOT NULL,
  `seatNo` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `layover`
--

INSERT INTO `layover` (`layoverID`, `flightID`, `stopNo`, `origin`, `destination`, `flightNo`, `seatNo`) VALUES
(6, 21331, 0, 'BOS', 'JFK', 111111111, '27A'),
(7, 44444, 0, 'LAX', 'MIA', 34352, '01B'),
(8, 44444, 0, 'MIA', 'DOV', 432543, '10D'),
(9, 55555, 1, 'LAX', 'JFK', 22323, '12C');

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `passengerID` int(32) NOT NULL,
  `passportNo` varchar(32) NOT NULL,
  `nationality` varchar(32) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `middleName` varchar(32) DEFAULT NULL,
  `lastName` varchar(32) NOT NULL,
  `DOB` date DEFAULT NULL,
  `gender` varchar(16) NOT NULL,
  `street` varchar(32) DEFAULT NULL,
  `city` varchar(32) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zipcode` int(5) DEFAULT NULL,
  `email` varchar(32) NOT NULL,
  `phone` bigint(10) DEFAULT NULL,
  `inChina` tinyint(1) NOT NULL,
  `date_inChina` date DEFAULT NULL,
  `fever` tinyint(1) NOT NULL,
  `cough` tinyint(1) NOT NULL,
  `difficultyBreathing` tinyint(1) NOT NULL,
  `inRegions` tinyint(1) DEFAULT NULL,
  `recentCountries` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `passenger`
--

INSERT INTO `passenger` (`passengerID`, `passportNo`, `nationality`, `firstName`, `middleName`, `lastName`, `DOB`, `gender`, `street`, `city`, `state`, `zipcode`, `email`, `phone`, `inChina`, `date_inChina`, `fever`, `cough`, `difficultyBreathing`, `inRegions`, `recentCountries`) VALUES
(1, '111111111', 'Chinese', 'Nico', NULL, 'Wang', NULL, 'female', NULL, NULL, NULL, NULL, 'nicowang@gmail.com', 1112223333, 1, '2020-03-02', 0, 0, 0, 0, NULL),
(2, 'K12342352', 'British', 'Joellyn', NULL, 'Panton', '1954-01-08', 'Female', '7690 Florence Parkway', 'Nashville', 'TN', 37245, 'jpanton0@discovery.com', 6151307355, 0, NULL, 0, 0, 0, 0, NULL),
(3, 'G35424432', 'American', 'Rutherford', NULL, 'Wisker', '1975-04-05', 'Male', '9333 Tennessee Circle', 'Jacksonville', 'FL', 32220, 'rwisker1@acquirethisname.com', 9047951236, 0, NULL, 0, 0, 0, 0, NULL),
(4, 'G223187', 'Italian', 'Lucia', 'B', 'Rossi', '1992-02-11', 'female', '100 Boylston st', 'Boston', 'MA', 20116, 'rossil@gmail.com', 376383231, 0, NULL, 0, 0, 0, 0, NULL),
(5, '015042343', 'American', 'Alfonso', NULL, 'Velez', '1930-12-02', 'Male', '4 Ruskin Street', 'Charlotte', 'NC', 28220, 'avelez2@soundcloud.com', 7047616229, 1, '2020-03-23', 1, 0, 1, 0, NULL),
(6, 'X02430033', 'American', 'Jase', NULL, 'Halsall', '1971-08-17', 'Male', '5557 Thackeray Crossing', 'Gainesville', 'GA', 30506, 'jhalsall3@xinhuanet.com', 7702996126, 0, NULL, 1, 0, 1, 1, 'Italy'),
(7, '233336662', 'American', 'Misty', 'K', 'Dangl', '1960-10-14', 'Female', '27 Ohio Avenue', 'Des Moines', 'NY', 50936, 'mdangl4@netlog.com', 5151137228, 1, '2020-01-01', 0, 1, 0, 0, NULL),
(8, '673232412', 'American', 'Towney', NULL, 'Huyghe', '1937-04-25', 'Male', '40 Vermont Junction', 'Houston', 'TX', 77020, 'thuyghe5@shop-pro.jp', 7136167287, 1, '2020-01-24', 0, 1, 1, 1, 'Finland'),
(9, '687935325', 'American', 'Benji', NULL, 'Boman', '1930-09-03', 'Male', '2785 Drewry Avenue', 'El Paso', 'TX', 79916, 'bboman6@twitpic.com', 9151320033, 1, '2020-02-29', 0, 0, 0, 0, NULL),
(10, '337352266', 'American', 'Sidonnie', NULL, 'Abramof', '1933-08-13', 'Female', '5805 Talmadge Alley', 'El Paso', 'MA', 79950, 'sabramof7@dot.gov', 9158166183, 0, NULL, 0, 0, 0, 0, NULL),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`flightID`),
  ADD KEY `passengerID` (`passengerID`);

--
-- Indexes for table `layover`
--
ALTER TABLE `layover`
  ADD PRIMARY KEY (`layoverID`),
  ADD KEY `FK2` (`flightID`);

--
-- Indexes for table `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`passengerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flight`
--
ALTER TABLE `flight`
  MODIFY `flightID` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98107;

--
-- AUTO_INCREMENT for table `layover`
--
ALTER TABLE `layover`
  MODIFY `layoverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `passenger`
--
ALTER TABLE `passenger`
  MODIFY `passengerID` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91358;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `flight`
--
ALTER TABLE `flight`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`passengerID`) REFERENCES `passenger` (`passengerID`);

--
-- Constraints for table `layover`
--
ALTER TABLE `layover`
  ADD CONSTRAINT `FK2` FOREIGN KEY (`flightID`) REFERENCES `flight` (`flightID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
