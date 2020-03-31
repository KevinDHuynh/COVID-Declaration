-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2020 at 04:32 PM
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
  `stopNo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `layover`
--

CREATE TABLE `layover` (
  `flightID` int(32) NOT NULL,
  `stopNo` int(11) NOT NULL,
  `origin` varchar(3) NOT NULL,
  `destination` varchar(3) NOT NULL,
  `flightNo` int(9) NOT NULL,
  `seatNo` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `passengerID` int(32) NOT NULL,
  `passportNo` int(9) NOT NULL,
  `nationality` varchar(32) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `middleName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `DOB` date NOT NULL,
  `gender` varchar(16) NOT NULL,
  `street` varchar(32) NOT NULL,
  `city` varchar(32) NOT NULL,
  `state` int(32) NOT NULL,
  `zipcode` int(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `phone` varchar(32) NOT NULL,
  `mobile` tinyint(1) NOT NULL,
  `inChina` tinyint(1) NOT NULL,
  `date_inChina` date NOT NULL,
  `fever` tinyint(1) NOT NULL,
  `cough` tinyint(1) NOT NULL,
  `difficultyBreathing` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recentcountries`
--

CREATE TABLE `recentcountries` (
  `passengerID` int(11) NOT NULL,
  `country` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`flightID`);

--
-- Indexes for table `layover`
--
ALTER TABLE `layover`
  ADD PRIMARY KEY (`flightID`);

--
-- Indexes for table `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`passengerID`);

--
-- Indexes for table `recentcountries`
--
ALTER TABLE `recentcountries`
  ADD PRIMARY KEY (`passengerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flight`
--
ALTER TABLE `flight`
  MODIFY `flightID` int(32) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `passenger`
--
ALTER TABLE `passenger`
  MODIFY `passengerID` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `layover`
--
ALTER TABLE `layover`
  ADD CONSTRAINT `FK2` FOREIGN KEY (`flightID`) REFERENCES `flight` (`flightID`);

--
-- Constraints for table `recentcountries`
--
ALTER TABLE `recentcountries`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`passengerID`) REFERENCES `passenger` (`passengerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
