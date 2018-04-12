-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2018 at 07:36 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_db`
--
CREATE DATABASE IF NOT EXISTS `job_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `job_db`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_tblsavejobs` (IN `job_title` VARCHAR(500), IN `company` VARCHAR(500), IN `location` VARCHAR(500), IN `date_end` DATE, IN `url_link` VARCHAR(500), IN `salary_info` VARCHAR(500), IN `starred` VARCHAR(3))  NO SQL
INSERT INTO `tblSaveJobs`(`job_title`, `company`, `location`, `date`, `url_link`,`salary_info`,`starred`) VALUES (job_title, company, location, date_end, url_link,salary_info,starred)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `retrieve_savejobs` ()  NO SQL
SELECT * FROM `tblsavejobs`$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tblsavejobs`
--

CREATE TABLE `tblsavejobs` (
  `id` int(11) NOT NULL,
  `job_title` varchar(500) COLLATE utf8_bin NOT NULL,
  `company` varchar(500) COLLATE utf8_bin NOT NULL,
  `location` varchar(500) COLLATE utf8_bin NOT NULL,
  `date` date NOT NULL,
  `url_link` varchar(700) COLLATE utf8_bin NOT NULL,
  `salary_info` varchar(500) COLLATE utf8_bin NOT NULL,
  `starred` varchar(3) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tblsavejobs`
--

INSERT INTO `tblsavejobs` (`id`, `job_title`, `company`, `location`, `date`, `url_link`, `salary_info`, `starred`) VALUES
(1, 'Supervisory Information Technology Specialist (Policy and Planning)', 'U.S. Army Cyber Command', 'Avaliable in Texas', '2018-04-11', 'https://www.usajobs.gov/GetJob/ViewDetails/496365600', 'Starting at $ 103,106.00', 'yes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblsavejobs`
--
ALTER TABLE `tblsavejobs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblsavejobs`
--
ALTER TABLE `tblsavejobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
