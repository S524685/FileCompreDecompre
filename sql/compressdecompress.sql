-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2024 at 12:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `compressdecompress`
--

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `user` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `datetime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `user`, `type`, `name`, `size`, `datetime`) VALUES
(6, 7, 'decompression', 'sample_compressed (24)_decompressed.txt', '0.10 KB', '10/31/2023, 11:25:50 AM'),
(7, 7, 'decompression', 'sample_compressed (24)_decompressed.txt', '0.10 KB', '10/31/2023, 11:29:17 AM'),
(8, 7, 'compression', 'sample_compressed.txt', '0.09 KB', '10/31/2023, 11:36:34 AM'),
(9, 7, 'decompression', 'sample_compressed (26)_decompressed.txt', '0.10 KB', '10/31/2023, 11:37:08 AM'),
(10, 7, 'compression', 'sample_compressed.txt', '0.09 KB', '10/31/2023, 11:37:31 AM'),
(11, 7, 'compression', 'sample_compressed.txt', '0.09 KB', '10/31/2023, 11:44:21 AM'),
(12, 4, 'compression', 'file_compressed.txt', '4207.74 KB', '10/31/2023, 3:30:48 PM'),
(13, 4, 'decompression', 'file_compressed (11)_decompressed.txt', '4980.47 KB', '10/31/2023, 3:41:30 PM'),
(14, 7, 'compression', 'file_compressed.txt', '4207.74 KB', '10/31/2023, 7:36:48 PM'),
(15, 7, 'compression', 'file_compressed.txt', '4207.74 KB', '10/31/2023, 7:43:48 PM'),
(16, 7, 'compression', 'file_compressed.txt', '4207.74 KB', '10/31/2023, 7:46:35 PM'),
(17, 7, 'decompression', 'file_compressed (14)_decompressed.txt', '4980.47 KB', '10/31/2023, 7:47:05 PM'),
(18, 8, 'compression', 'sujankaranjit_compressed.txt', '0.19 KB', '8/15/2024, 11:23:59 AM');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `user_name`, `email`, `password`) VALUES
(1, 'sample ', 'sample@gmail.com', '$2y$10$j.wEy.NeHJB/W2fvzFrRHOfW6myUCxu8iGbFnUgk3.WIFIZyU0t/W'),
(2, 'ekin', 'ekin@gmail.com', '$2y$10$Wj6WYtI04wLjl72BAXNva.M8cjCRneBE4sCeZ/F/5RQI2QvL/d5sa'),
(3, 'sample1', 'sample1@gmail.com', '$2y$10$kQA.ct.di/kJXmJK4xJR5.mlwgT5P2e7OMPfKsm2q/VU5ITuPyZsi'),
(4, 'Sujan', 'sujankaranjit5@gmail.com', '$2y$10$wD8fXtxUKxLdXBsK62LM0.BAlzXZv38T8Aruuwi3uIJ3LdEo8vDlO'),
(7, 'sujankaranjit', 'sujank@gmail.com', '$2y$10$zmYngbMFsZeuasYwAuLUdeCc8c9xK35ZsY5dHzpArP4yeqqL7QJzq'),
(8, 'root', 'root@gmail.com', '$2y$10$xEnzeLHQLS0HAxLLvEWZzeEJpb6QjSw99A7VRGsFul4HQoZQnHIJO'),
(9, 'ajng', 'ajng@gmail.com', '$2y$10$qjtnOEQ9.kYN7aTbkNAEmO7.sY8UNj8NH1ANxg.ZrYKbZ3/zk4AjC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
