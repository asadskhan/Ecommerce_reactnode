-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 02, 2020 at 06:24 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `construction_app_admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `is_active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `title`, `is_deleted`, `is_active`) VALUES
(1, 'PUMA', 0, 1),
(2, 'Adiddas', 0, 1),
(4, 'GUCCI', 0, 1),
(5, 'Nike', 0, 1),
(6, 'Burberry', 0, 1),
(7, 'Loius Vuitton', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `is_active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `image`, `slug`, `parent_id`, `is_deleted`, `is_active`) VALUES
(1, 'Men', NULL, 'men', 0, 0, 1),
(2, 'Women', NULL, NULL, 0, 0, 1),
(14, 'Footwear', NULL, NULL, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `middle_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` enum('1','2','3') NOT NULL,
  `date` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `status` enum('0','1') NOT NULL,
  `is_suspend` enum('0','1') NOT NULL COMMENT '1=suspend',
  `is_subscription` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=paid',
  `renewal_flag` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`user_id`, `first_name`, `middle_name`, `last_name`, `email`, `password`, `role_id`, `date`, `updated_at`, `last_login`, `status`, `is_suspend`, `is_subscription`, `renewal_flag`) VALUES
(1, 'admin', 'admin', 'admin', 'admin@gmail.com', '123456', '1', '2019-03-13 04:27:29', '0000-00-00 00:00:00', '2020-01-10 12:01:33', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `color_code` varchar(150) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `is_active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id`, `title`, `color_code`, `is_deleted`, `is_active`) VALUES
(1, 'White', '#0000', 0, 1),
(7, 'Black', '#444', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `membership_transactions`
--

CREATE TABLE `membership_transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `subscription_id` varchar(255) DEFAULT NULL,
  `total_transactions` int(11) DEFAULT NULL,
  `plan_title` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `days` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `store` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `price` float(8,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `discount` float(8,2) DEFAULT NULL,
  `discounted_price` float(8,2) DEFAULT NULL,
  `description` text,
  `specification` text,
  `rating` varchar(30) DEFAULT NULL,
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_keyword` varchar(150) DEFAULT NULL,
  `meta_description` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `slug`, `store`, `category_id`, `brand`, `color`, `price`, `quantity`, `discount`, `discounted_price`, `description`, `specification`, `rating`, `meta_title`, `meta_keyword`, `meta_description`, `is_active`, `is_deleted`, `created_at`) VALUES
(5, 'Max Men\'s Half Sleeve Solid Slim fit Polo Neck T-shirt', 'max-mens-half-sleeve-solid-slim-fit-polo-neck-t-shirt', NULL, 1, '', '1,7', 200.00, NULL, 8.10, 183.80, '<p>Description</p>\r\n', '', NULL, 'Meta title', 'Meta Keyword', 'Meta Description', 1, 0, '2020-11-30 12:27:54'),
(6, 'Max Women\'s Half Sleeve Solid Slim fit Polo Neck T-shirt', 'max-womens-half-sleeve-solid-slim-fit-polo-neck-t-shirt', NULL, 1, NULL, NULL, 2650.00, NULL, 6.00, 2491.00, '<p>Desc</p>\r\n', '<p>Specification</p>\r\n', NULL, 'Max Women\'s Half Sleeve Solid Slim fit Polo Neck T-shirt', 'Meta keyword', 'Meta Description', 1, 0, '2020-11-30 14:00:27'),
(7, 'dsafa', 'dsafa', NULL, 1, '2', '7', 5000.00, NULL, 0.00, 0.00, '<p>fsdgs</p>\r\n', '<p>dvgb</p>\r\n', NULL, 'dsafa', 'hfdn', 'asfsdg', 1, 0, '2020-11-30 14:03:58'),
(8, 'Running shoes', 'running-shoes', NULL, 2, '1', '1', 3650.00, NULL, 3.51, 3521.88, '<p>cfascvsdgv</p>\r\n', '<p>fasfgasdg</p>\r\n', NULL, 'Running shoes', 'casdfgasd', 'safsadgda', 1, 0, '2020-11-30 15:47:51'),
(9, 'test client product ouuocksdv', 'test-client-product-ouuocksdv', NULL, 1, '1', '1,7', 25.00, NULL, 0.00, 0.00, '<p>czsdvsvsd</p>\r\n', '<p>vzsdxb</p>\r\n', NULL, 'test client product ouuocksdv', '', '', 1, 0, '2020-11-30 17:07:55');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `default_image` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`, `default_image`) VALUES
(1, 7, 'Screenshot from 2020-11-10 13-00-00.png', 0),
(2, 7, 'Screenshot from 2020-11-10 15-35-06.png', 0),
(3, 7, 'Screenshot from 2020-11-10 15-24-15.png', 0),
(4, 5, 'Screenshot from 2020-11-10 15-24-15.png', 0),
(5, 8, 'Screenshot from 2020-11-10 15-24-15.png', 1),
(6, 8, 'Screenshot from 2020-11-10 15-35-06.png', 0),
(7, 8, 'Screenshot from 2020-11-10 15-40-06.png', 0),
(8, 5, 'Screenshot from 2020-11-27 17-06-17.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `no_transaction` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `transcation_id` varchar(255) DEFAULT NULL,
  `subscription_name` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `days` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `contact_number` varchar(60) DEFAULT NULL,
  `role_id` enum('1','2','3') NOT NULL DEFAULT '1',
  `status` enum('0','1') DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `contact_number`, `role_id`, `status`, `last_login`, `updated_at`, `created_at`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', '123456', '9662498678', '1', '1', '2020-01-10 12:01:33', '0000-00-00 00:00:00', '2019-03-13 04:27:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `id` (`user_id`),
  ADD KEY `is_subscription` (`is_subscription`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membership_transactions`
--
ALTER TABLE `membership_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `products_ibfk_1` (`category_id`),
  ADD KEY `title` (`title`),
  ADD KEY `slug` (`slug`),
  ADD KEY `price` (`price`),
  ADD KEY `quantity` (`quantity`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `status` (`status`),
  ADD KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `first_name` (`first_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `membership_transactions`
--
ALTER TABLE `membership_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
