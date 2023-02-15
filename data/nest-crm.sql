-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2023 at 05:35 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nest-crm`
--

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `fname`, `lname`, `email`, `phone_number`, `assignee_id`, `country_id`, `workspace_id`, `tenant_id`) VALUES
(18, '2023-02-11 13:43:55.647', '2023-02-11 13:43:55.647', NULL, 1, 'sojebsikder', NULL, NULL, '8801833962595', NULL, NULL, 1, 1);

--
-- Dumping data for table `contact_workspace_channels`
--

INSERT INTO `contact_workspace_channels` (`created_at`, `updated_at`, `workspace_channel_id`, `contact_id`, `workspace_id`, `tenant_id`) VALUES
('2023-02-11 13:43:55.759', '2023-02-11 13:43:55.759', 9, 18, 1, 1);

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `created_at`, `updated_at`, `is_open`, `contact_id`, `workspace_channel_id`, `workspace_id`, `tenant_id`) VALUES
(5, '2023-02-11 13:43:56.237', '2023-02-11 13:43:56.237', 1, 18, 9, 1, 1);

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `created_at`, `updated_at`, `status`, `flag`, `name`, `country_code`, `dial_code`) VALUES
(1, '2022-12-07 22:47:05.785', '2022-12-07 22:47:05.785', 1, 'https://cdn.kcak11.com/CountryFlags/countries/af.svg', 'Afghanistan', 'AF', '+93'),
(2, '2022-12-07 22:47:05.835', '2022-12-07 22:47:05.835', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ax.svg', 'Aland Islands', 'AX', '+358'),
(3, '2022-12-07 22:47:05.870', '2022-12-07 22:47:05.870', 1, 'https://cdn.kcak11.com/CountryFlags/countries/al.svg', 'Albania', 'AL', '+355'),
(4, '2022-12-07 22:47:05.920', '2022-12-07 22:47:05.920', 1, 'https://cdn.kcak11.com/CountryFlags/countries/dz.svg', 'Algeria', 'DZ', '+213'),
(5, '2022-12-07 22:47:05.962', '2022-12-07 22:47:05.962', 1, 'https://cdn.kcak11.com/CountryFlags/countries/as.svg', 'American Samoa', 'AS', '+1684'),
(6, '2022-12-07 22:47:05.979', '2022-12-07 22:47:05.979', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ad.svg', 'Andorra', 'AD', '+376'),
(7, '2022-12-07 22:47:05.995', '2022-12-07 22:47:05.995', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ao.svg', 'Angola', 'AO', '+244'),
(8, '2022-12-07 22:47:06.013', '2022-12-07 22:47:06.013', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ai.svg', 'Anguilla', 'AI', '+1264'),
(9, '2022-12-07 22:47:06.029', '2022-12-07 22:47:06.029', 1, 'https://cdn.kcak11.com/CountryFlags/countries/aq.svg', 'Antarctica', 'AQ', '+672'),
(10, '2022-12-07 22:47:06.046', '2022-12-07 22:47:06.046', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ag.svg', 'Antigua and Barbuda', 'AG', '+1268'),
(11, '2022-12-07 22:47:06.062', '2022-12-07 22:47:06.062', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ar.svg', 'Argentina', 'AR', '+54'),
(12, '2022-12-07 22:47:06.088', '2022-12-07 22:47:06.088', 1, 'https://cdn.kcak11.com/CountryFlags/countries/am.svg', 'Armenia', 'AM', '+374'),
(13, '2022-12-07 22:47:06.105', '2022-12-07 22:47:06.105', 1, 'https://cdn.kcak11.com/CountryFlags/countries/aw.svg', 'Aruba', 'AW', '+297'),
(14, '2022-12-07 22:47:06.121', '2022-12-07 22:47:06.121', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ac.svg', 'Ascension Island', 'AC', '+247'),
(15, '2022-12-07 22:47:06.137', '2022-12-07 22:47:06.137', 1, 'https://cdn.kcak11.com/CountryFlags/countries/au.svg', 'Australia', 'AU', '+61'),
(16, '2022-12-07 22:47:06.155', '2022-12-07 22:47:06.155', 1, 'https://cdn.kcak11.com/CountryFlags/countries/at.svg', 'Austria', 'AT', '+43'),
(17, '2022-12-07 22:47:06.232', '2022-12-07 22:47:06.232', 1, 'https://cdn.kcak11.com/CountryFlags/countries/az.svg', 'Azerbaijan', 'AZ', '+994'),
(18, '2022-12-07 22:47:06.329', '2022-12-07 22:47:06.329', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bs.svg', 'Bahamas', 'BS', '+1242'),
(19, '2022-12-07 22:47:06.409', '2022-12-07 22:47:06.409', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bh.svg', 'Bahrain', 'BH', '+973'),
(20, '2022-12-07 22:47:06.433', '2022-12-07 22:47:06.433', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bd.svg', 'Bangladesh', 'BD', '+880'),
(21, '2022-12-07 22:47:06.446', '2022-12-07 22:47:06.446', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bb.svg', 'Barbados', 'BB', '+1246'),
(22, '2022-12-07 22:47:06.462', '2022-12-07 22:47:06.462', 1, 'https://cdn.kcak11.com/CountryFlags/countries/by.svg', 'Belarus', 'BY', '+375'),
(23, '2022-12-07 22:47:06.480', '2022-12-07 22:47:06.480', 1, 'https://cdn.kcak11.com/CountryFlags/countries/be.svg', 'Belgium', 'BE', '+32'),
(24, '2022-12-07 22:47:06.496', '2022-12-07 22:47:06.496', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bz.svg', 'Belize', 'BZ', '+501'),
(25, '2022-12-07 22:47:06.515', '2022-12-07 22:47:06.515', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bj.svg', 'Benin', 'BJ', '+229'),
(26, '2022-12-07 22:47:06.562', '2022-12-07 22:47:06.562', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bm.svg', 'Bermuda', 'BM', '+1441'),
(27, '2022-12-07 22:47:06.579', '2022-12-07 22:47:06.579', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bt.svg', 'Bhutan', 'BT', '+975'),
(28, '2022-12-07 22:47:06.608', '2022-12-07 22:47:06.608', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bo.svg', 'Bolivia', 'BO', '+591'),
(29, '2022-12-07 22:47:06.625', '2022-12-07 22:47:06.625', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ba.svg', 'Bosnia and Herzegovina', 'BA', '+387'),
(30, '2022-12-07 22:47:06.649', '2022-12-07 22:47:06.649', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bw.svg', 'Botswana', 'BW', '+267'),
(31, '2022-12-07 22:47:06.667', '2022-12-07 22:47:06.667', 1, 'https://cdn.kcak11.com/CountryFlags/countries/br.svg', 'Brazil', 'BR', '+55'),
(32, '2022-12-07 22:47:06.690', '2022-12-07 22:47:06.690', 1, 'https://cdn.kcak11.com/CountryFlags/countries/io.svg', 'British Indian Ocean Territory', 'IO', '+246'),
(33, '2022-12-07 22:47:06.706', '2022-12-07 22:47:06.706', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bn.svg', 'Brunei Darussalam', 'BN', '+673'),
(34, '2022-12-07 22:47:06.722', '2022-12-07 22:47:06.722', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bg.svg', 'Bulgaria', 'BG', '+359'),
(35, '2022-12-07 22:47:06.739', '2022-12-07 22:47:06.739', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bf.svg', 'Burkina Faso', 'BF', '+226'),
(36, '2022-12-07 22:47:06.775', '2022-12-07 22:47:06.775', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bi.svg', 'Burundi', 'BI', '+257'),
(37, '2022-12-07 22:47:06.800', '2022-12-07 22:47:06.800', 1, 'https://cdn.kcak11.com/CountryFlags/countries/kh.svg', 'Cambodia', 'KH', '+855'),
(38, '2022-12-07 22:47:06.824', '2022-12-07 22:47:06.824', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cm.svg', 'Cameroon', 'CM', '+237'),
(39, '2022-12-07 22:47:06.899', '2022-12-07 22:47:06.899', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ca.svg', 'Canada', 'CA', '+1'),
(40, '2022-12-07 22:47:06.933', '2022-12-07 22:47:06.933', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cv.svg', 'Cape Verde', 'CV', '+238'),
(41, '2022-12-07 22:47:06.958', '2022-12-07 22:47:06.958', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ky.svg', 'Cayman Islands', 'KY', '+1345'),
(42, '2022-12-07 22:47:06.984', '2022-12-07 22:47:06.984', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cf.svg', 'Central African Republic', 'CF', '+236'),
(43, '2022-12-07 22:47:07.007', '2022-12-07 22:47:07.007', 1, 'https://cdn.kcak11.com/CountryFlags/countries/td.svg', 'Chad', 'TD', '+235'),
(44, '2022-12-07 22:47:07.042', '2022-12-07 22:47:07.042', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cl.svg', 'Chile', 'CL', '+56'),
(45, '2022-12-07 22:47:07.062', '2022-12-07 22:47:07.062', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cn.svg', 'China', 'CN', '+86'),
(46, '2022-12-07 22:47:07.079', '2022-12-07 22:47:07.079', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cx.svg', 'Christmas Island', 'CX', '+61'),
(47, '2022-12-07 22:47:07.095', '2022-12-07 22:47:07.095', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cc.svg', 'Cocos (Keeling) Islands', 'CC', '+61'),
(48, '2022-12-07 22:47:07.113', '2022-12-07 22:47:07.113', 1, 'https://cdn.kcak11.com/CountryFlags/countries/co.svg', 'Colombia', 'CO', '+57'),
(49, '2022-12-07 22:47:07.129', '2022-12-07 22:47:07.129', 1, 'https://cdn.kcak11.com/CountryFlags/countries/km.svg', 'Comoros', 'KM', '+269'),
(50, '2022-12-07 22:47:07.147', '2022-12-07 22:47:07.147', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cg.svg', 'Congo', 'CG', '+242'),
(51, '2022-12-07 22:47:07.164', '2022-12-07 22:47:07.164', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ck.svg', 'Cook Islands', 'CK', '+682'),
(52, '2022-12-07 22:47:07.183', '2022-12-07 22:47:07.183', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cr.svg', 'Costa Rica', 'CR', '+506'),
(53, '2022-12-07 22:47:07.208', '2022-12-07 22:47:07.208', 1, 'https://cdn.kcak11.com/CountryFlags/countries/hr.svg', 'Croatia', 'HR', '+385'),
(54, '2022-12-07 22:47:07.241', '2022-12-07 22:47:07.241', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cu.svg', 'Cuba', 'CU', '+53'),
(55, '2022-12-07 22:47:07.259', '2022-12-07 22:47:07.259', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cy.svg', 'Cyprus', 'CY', '+357'),
(56, '2022-12-07 22:47:07.283', '2022-12-07 22:47:07.283', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cz.svg', 'Czech Republic', 'CZ', '+420'),
(57, '2022-12-07 22:47:07.308', '2022-12-07 22:47:07.308', 1, 'https://cdn.kcak11.com/CountryFlags/countries/cd.svg', 'Democratic Republic of the Congo', 'CD', '+243'),
(58, '2022-12-07 22:47:07.416', '2022-12-07 22:47:07.416', 1, 'https://cdn.kcak11.com/CountryFlags/countries/dk.svg', 'Denmark', 'DK', '+45'),
(59, '2022-12-07 22:47:07.515', '2022-12-07 22:47:07.515', 1, 'https://cdn.kcak11.com/CountryFlags/countries/dj.svg', 'Djibouti', 'DJ', '+253'),
(60, '2022-12-07 22:47:07.696', '2022-12-07 22:47:07.696', 1, 'https://cdn.kcak11.com/CountryFlags/countries/dm.svg', 'Dominica', 'DM', '+1767'),
(61, '2022-12-07 22:47:07.714', '2022-12-07 22:47:07.714', 1, 'https://cdn.kcak11.com/CountryFlags/countries/do.svg', 'Dominican Republic', 'DO', '+1849'),
(62, '2022-12-07 22:47:07.741', '2022-12-07 22:47:07.741', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ec.svg', 'Ecuador', 'EC', '+593'),
(63, '2022-12-07 22:47:07.756', '2022-12-07 22:47:07.756', 1, 'https://cdn.kcak11.com/CountryFlags/countries/eg.svg', 'Egypt', 'EG', '+20'),
(64, '2022-12-07 22:47:07.787', '2022-12-07 22:47:07.787', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sv.svg', 'El Salvador', 'SV', '+503'),
(65, '2022-12-07 22:47:07.804', '2022-12-07 22:47:07.804', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gq.svg', 'Equatorial Guinea', 'GQ', '+240'),
(66, '2022-12-07 22:47:07.830', '2022-12-07 22:47:07.830', 1, 'https://cdn.kcak11.com/CountryFlags/countries/er.svg', 'Eritrea', 'ER', '+291'),
(67, '2022-12-07 22:47:07.858', '2022-12-07 22:47:07.858', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ee.svg', 'Estonia', 'EE', '+372'),
(68, '2022-12-07 22:47:07.883', '2022-12-07 22:47:07.883', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sz.svg', 'Eswatini', 'SZ', '+268'),
(69, '2022-12-07 22:47:07.908', '2022-12-07 22:47:07.908', 1, 'https://cdn.kcak11.com/CountryFlags/countries/et.svg', 'Ethiopia', 'ET', '+251'),
(70, '2022-12-07 22:47:07.928', '2022-12-07 22:47:07.928', 1, 'https://cdn.kcak11.com/CountryFlags/countries/fk.svg', 'Falkland Islands (Malvinas)', 'FK', '+500'),
(71, '2022-12-07 22:47:07.946', '2022-12-07 22:47:07.946', 1, 'https://cdn.kcak11.com/CountryFlags/countries/fo.svg', 'Faroe Islands', 'FO', '+298'),
(72, '2022-12-07 22:47:07.962', '2022-12-07 22:47:07.962', 1, 'https://cdn.kcak11.com/CountryFlags/countries/fj.svg', 'Fiji', 'FJ', '+679'),
(73, '2022-12-07 22:47:07.979', '2022-12-07 22:47:07.979', 1, 'https://cdn.kcak11.com/CountryFlags/countries/fi.svg', 'Finland', 'FI', '+358'),
(74, '2022-12-07 22:47:07.995', '2022-12-07 22:47:07.995', 1, 'https://cdn.kcak11.com/CountryFlags/countries/fr.svg', 'France', 'FR', '+33'),
(75, '2022-12-07 22:47:08.021', '2022-12-07 22:47:08.021', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gf.svg', 'French Guiana', 'GF', '+594'),
(76, '2022-12-07 22:47:08.038', '2022-12-07 22:47:08.038', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pf.svg', 'French Polynesia', 'PF', '+689'),
(77, '2022-12-07 22:47:08.055', '2022-12-07 22:47:08.055', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ga.svg', 'Gabon', 'GA', '+241'),
(78, '2022-12-07 22:47:08.070', '2022-12-07 22:47:08.070', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gm.svg', 'Gambia', 'GM', '+220'),
(79, '2022-12-07 22:47:08.088', '2022-12-07 22:47:08.088', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ge.svg', 'Georgia', 'GE', '+995'),
(80, '2022-12-07 22:47:08.112', '2022-12-07 22:47:08.112', 1, 'https://cdn.kcak11.com/CountryFlags/countries/de.svg', 'Germany', 'DE', '+49'),
(81, '2022-12-07 22:47:08.138', '2022-12-07 22:47:08.138', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gh.svg', 'Ghana', 'GH', '+233'),
(82, '2022-12-07 22:47:08.164', '2022-12-07 22:47:08.164', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gi.svg', 'Gibraltar', 'GI', '+350'),
(83, '2022-12-07 22:47:08.183', '2022-12-07 22:47:08.183', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gr.svg', 'Greece', 'GR', '+30'),
(84, '2022-12-07 22:47:08.208', '2022-12-07 22:47:08.208', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gl.svg', 'Greenland', 'GL', '+299'),
(85, '2022-12-07 22:47:08.225', '2022-12-07 22:47:08.225', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gd.svg', 'Grenada', 'GD', '+1473'),
(86, '2022-12-07 22:47:08.249', '2022-12-07 22:47:08.249', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gp.svg', 'Guadeloupe', 'GP', '+590'),
(87, '2022-12-07 22:47:08.282', '2022-12-07 22:47:08.282', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gu.svg', 'Guam', 'GU', '+1671'),
(88, '2022-12-07 22:47:08.300', '2022-12-07 22:47:08.300', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gt.svg', 'Guatemala', 'GT', '+502'),
(89, '2022-12-07 22:47:08.324', '2022-12-07 22:47:08.324', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gg.svg', 'Guernsey', 'GG', '+44-1481'),
(90, '2022-12-07 22:47:08.342', '2022-12-07 22:47:08.342', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gn.svg', 'Guinea', 'GN', '+224'),
(91, '2022-12-07 22:47:08.366', '2022-12-07 22:47:08.366', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gw.svg', 'Guinea-Bissau', 'GW', '+245'),
(92, '2022-12-07 22:47:08.475', '2022-12-07 22:47:08.475', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gy.svg', 'Guyana', 'GY', '+592'),
(93, '2022-12-07 22:47:08.500', '2022-12-07 22:47:08.500', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ht.svg', 'Haiti', 'HT', '+509'),
(94, '2022-12-07 22:47:08.575', '2022-12-07 22:47:08.575', 1, 'https://cdn.kcak11.com/CountryFlags/countries/va.svg', 'Holy See (Vatican City State)', 'VA', '+379'),
(95, '2022-12-07 22:47:08.599', '2022-12-07 22:47:08.599', 1, 'https://cdn.kcak11.com/CountryFlags/countries/hn.svg', 'Honduras', 'HN', '+504'),
(96, '2022-12-07 22:47:08.633', '2022-12-07 22:47:08.633', 1, 'https://cdn.kcak11.com/CountryFlags/countries/hk.svg', 'Hong Kong', 'HK', '+852'),
(97, '2022-12-07 22:47:08.658', '2022-12-07 22:47:08.658', 1, 'https://cdn.kcak11.com/CountryFlags/countries/hu.svg', 'Hungary', 'HU', '+36'),
(98, '2022-12-07 22:47:08.673', '2022-12-07 22:47:08.673', 1, 'https://cdn.kcak11.com/CountryFlags/countries/is.svg', 'Iceland', 'IS', '+354'),
(99, '2022-12-07 22:47:08.687', '2022-12-07 22:47:08.687', 1, 'https://cdn.kcak11.com/CountryFlags/countries/in.svg', 'India', 'IN', '+91'),
(100, '2022-12-07 22:47:08.704', '2022-12-07 22:47:08.704', 1, 'https://cdn.kcak11.com/CountryFlags/countries/id.svg', 'Indonesia', 'ID', '+62'),
(101, '2022-12-07 22:47:08.729', '2022-12-07 22:47:08.729', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ir.svg', 'Iran', 'IR', '+98'),
(102, '2022-12-07 22:47:08.746', '2022-12-07 22:47:08.746', 1, 'https://cdn.kcak11.com/CountryFlags/countries/iq.svg', 'Iraq', 'IQ', '+964'),
(103, '2022-12-07 22:47:08.762', '2022-12-07 22:47:08.762', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ie.svg', 'Ireland', 'IE', '+353'),
(104, '2022-12-07 22:47:08.780', '2022-12-07 22:47:08.780', 1, 'https://cdn.kcak11.com/CountryFlags/countries/im.svg', 'Isle of Man', 'IM', '+44-1624'),
(105, '2022-12-07 22:47:08.796', '2022-12-07 22:47:08.796', 1, 'https://cdn.kcak11.com/CountryFlags/countries/il.svg', 'Israel', 'IL', '+972'),
(106, '2022-12-07 22:47:08.815', '2022-12-07 22:47:08.815', 1, 'https://cdn.kcak11.com/CountryFlags/countries/it.svg', 'Italy', 'IT', '+39'),
(107, '2022-12-07 22:47:08.831', '2022-12-07 22:47:08.831', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ci.svg', 'Ivory Coast / Cote d\'Ivoire', 'CI', '+225'),
(108, '2022-12-07 22:47:08.858', '2022-12-07 22:47:08.858', 1, 'https://cdn.kcak11.com/CountryFlags/countries/jm.svg', 'Jamaica', 'JM', '+1876'),
(109, '2022-12-07 22:47:08.874', '2022-12-07 22:47:08.874', 1, 'https://cdn.kcak11.com/CountryFlags/countries/jp.svg', 'Japan', 'JP', '+81'),
(110, '2022-12-07 22:47:08.900', '2022-12-07 22:47:08.900', 1, 'https://cdn.kcak11.com/CountryFlags/countries/je.svg', 'Jersey', 'JE', '+44-1534'),
(111, '2022-12-07 22:47:08.924', '2022-12-07 22:47:08.924', 1, 'https://cdn.kcak11.com/CountryFlags/countries/jo.svg', 'Jordan', 'JO', '+962'),
(112, '2022-12-07 22:47:08.950', '2022-12-07 22:47:08.950', 1, 'https://cdn.kcak11.com/CountryFlags/countries/kz.svg', 'Kazakhstan', 'KZ', '+77'),
(113, '2022-12-07 22:47:08.974', '2022-12-07 22:47:08.974', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ke.svg', 'Kenya', 'KE', '+254'),
(114, '2022-12-07 22:47:08.992', '2022-12-07 22:47:08.992', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ki.svg', 'Kiribati', 'KI', '+686'),
(115, '2022-12-07 22:47:09.006', '2022-12-07 22:47:09.006', 1, 'https://cdn.kcak11.com/CountryFlags/countries/kp.svg', 'Korea, Democratic People\'s Republic of Korea', 'KP', '+850'),
(116, '2022-12-07 22:47:09.022', '2022-12-07 22:47:09.022', 1, 'https://cdn.kcak11.com/CountryFlags/countries/kr.svg', 'Korea, Republic of South Korea', 'KR', '+82'),
(117, '2022-12-07 22:47:09.037', '2022-12-07 22:47:09.037', 1, 'https://cdn.kcak11.com/CountryFlags/countries/xk.svg', 'Kosovo', 'XK', '+383'),
(118, '2022-12-07 22:47:09.151', '2022-12-07 22:47:09.151', 1, 'https://cdn.kcak11.com/CountryFlags/countries/kw.svg', 'Kuwait', 'KW', '+965'),
(119, '2022-12-07 22:47:09.191', '2022-12-07 22:47:09.191', 1, 'https://cdn.kcak11.com/CountryFlags/countries/kg.svg', 'Kyrgyzstan', 'KG', '+996'),
(120, '2022-12-07 22:47:09.209', '2022-12-07 22:47:09.209', 1, 'https://cdn.kcak11.com/CountryFlags/countries/la.svg', 'Laos', 'LA', '+856'),
(121, '2022-12-07 22:47:09.234', '2022-12-07 22:47:09.234', 1, 'https://cdn.kcak11.com/CountryFlags/countries/lv.svg', 'Latvia', 'LV', '+371'),
(122, '2022-12-07 22:47:09.259', '2022-12-07 22:47:09.259', 1, 'https://cdn.kcak11.com/CountryFlags/countries/lb.svg', 'Lebanon', 'LB', '+961'),
(123, '2022-12-07 22:47:09.283', '2022-12-07 22:47:09.283', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ls.svg', 'Lesotho', 'LS', '+266'),
(124, '2022-12-07 22:47:09.325', '2022-12-07 22:47:09.325', 1, 'https://cdn.kcak11.com/CountryFlags/countries/lr.svg', 'Liberia', 'LR', '+231'),
(125, '2022-12-07 22:47:09.342', '2022-12-07 22:47:09.342', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ly.svg', 'Libya', 'LY', '+218'),
(126, '2022-12-07 22:47:09.358', '2022-12-07 22:47:09.358', 1, 'https://cdn.kcak11.com/CountryFlags/countries/li.svg', 'Liechtenstein', 'LI', '+423'),
(127, '2022-12-07 22:47:09.375', '2022-12-07 22:47:09.375', 1, 'https://cdn.kcak11.com/CountryFlags/countries/lt.svg', 'Lithuania', 'LT', '+370'),
(128, '2022-12-07 22:47:09.391', '2022-12-07 22:47:09.391', 1, 'https://cdn.kcak11.com/CountryFlags/countries/lu.svg', 'Luxembourg', 'LU', '+352'),
(129, '2022-12-07 22:47:09.409', '2022-12-07 22:47:09.409', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mo.svg', 'Macau', 'MO', '+853'),
(130, '2022-12-07 22:47:09.473', '2022-12-07 22:47:09.473', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mg.svg', 'Madagascar', 'MG', '+261'),
(131, '2022-12-07 22:47:09.525', '2022-12-07 22:47:09.525', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mw.svg', 'Malawi', 'MW', '+265'),
(132, '2022-12-07 22:47:09.601', '2022-12-07 22:47:09.601', 1, 'https://cdn.kcak11.com/CountryFlags/countries/my.svg', 'Malaysia', 'MY', '+60'),
(133, '2022-12-07 22:47:09.650', '2022-12-07 22:47:09.650', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mv.svg', 'Maldives', 'MV', '+960'),
(134, '2022-12-07 22:47:09.712', '2022-12-07 22:47:09.712', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ml.svg', 'Mali', 'ML', '+223'),
(135, '2022-12-07 22:47:09.730', '2022-12-07 22:47:09.730', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mt.svg', 'Malta', 'MT', '+356'),
(136, '2022-12-07 22:47:09.763', '2022-12-07 22:47:09.763', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mh.svg', 'Marshall Islands', 'MH', '+692'),
(137, '2022-12-07 22:47:09.781', '2022-12-07 22:47:09.781', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mq.svg', 'Martinique', 'MQ', '+596'),
(138, '2022-12-07 22:47:09.800', '2022-12-07 22:47:09.800', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mr.svg', 'Mauritania', 'MR', '+222'),
(139, '2022-12-07 22:47:09.817', '2022-12-07 22:47:09.817', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mu.svg', 'Mauritius', 'MU', '+230'),
(140, '2022-12-07 22:47:09.833', '2022-12-07 22:47:09.833', 1, 'https://cdn.kcak11.com/CountryFlags/countries/yt.svg', 'Mayotte', 'YT', '+262'),
(141, '2022-12-07 22:47:09.851', '2022-12-07 22:47:09.851', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mx.svg', 'Mexico', 'MX', '+52'),
(142, '2022-12-07 22:47:09.866', '2022-12-07 22:47:09.866', 1, 'https://cdn.kcak11.com/CountryFlags/countries/fm.svg', 'Micronesia, Federated States of Micronesia', 'FM', '+691'),
(143, '2022-12-07 22:47:09.884', '2022-12-07 22:47:09.884', 1, 'https://cdn.kcak11.com/CountryFlags/countries/md.svg', 'Moldova', 'MD', '+373'),
(144, '2022-12-07 22:47:09.916', '2022-12-07 22:47:09.916', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mc.svg', 'Monaco', 'MC', '+377'),
(145, '2022-12-07 22:47:09.934', '2022-12-07 22:47:09.934', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mn.svg', 'Mongolia', 'MN', '+976'),
(146, '2022-12-07 22:47:09.950', '2022-12-07 22:47:09.950', 1, 'https://cdn.kcak11.com/CountryFlags/countries/me.svg', 'Montenegro', 'ME', '+382'),
(147, '2022-12-07 22:47:09.967', '2022-12-07 22:47:09.967', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ms.svg', 'Montserrat', 'MS', '+1664'),
(148, '2022-12-07 22:47:09.991', '2022-12-07 22:47:09.991', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ma.svg', 'Morocco', 'MA', '+212'),
(149, '2022-12-07 22:47:10.009', '2022-12-07 22:47:10.009', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mz.svg', 'Mozambique', 'MZ', '+258'),
(150, '2022-12-07 22:47:10.024', '2022-12-07 22:47:10.024', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mm.svg', 'Myanmar', 'MM', '+95'),
(151, '2022-12-07 22:47:10.042', '2022-12-07 22:47:10.042', 1, 'https://cdn.kcak11.com/CountryFlags/countries/na.svg', 'Namibia', 'NA', '+264'),
(152, '2022-12-07 22:47:10.054', '2022-12-07 22:47:10.054', 1, 'https://cdn.kcak11.com/CountryFlags/countries/nr.svg', 'Nauru', 'NR', '+674'),
(153, '2022-12-07 22:47:10.072', '2022-12-07 22:47:10.072', 1, 'https://cdn.kcak11.com/CountryFlags/countries/np.svg', 'Nepal', 'NP', '+977'),
(154, '2022-12-07 22:47:10.087', '2022-12-07 22:47:10.087', 1, 'https://cdn.kcak11.com/CountryFlags/countries/nl.svg', 'Netherlands', 'NL', '+31'),
(155, '2022-12-07 22:47:10.105', '2022-12-07 22:47:10.105', 1, 'https://cdn.kcak11.com/CountryFlags/countries/an.svg', 'Netherlands Antilles', 'AN', '+599'),
(156, '2022-12-07 22:47:10.122', '2022-12-07 22:47:10.122', 1, 'https://cdn.kcak11.com/CountryFlags/countries/nc.svg', 'New Caledonia', 'NC', '+687'),
(157, '2022-12-07 22:47:10.142', '2022-12-07 22:47:10.142', 1, 'https://cdn.kcak11.com/CountryFlags/countries/nz.svg', 'New Zealand', 'NZ', '+64'),
(158, '2022-12-07 22:47:10.175', '2022-12-07 22:47:10.175', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ni.svg', 'Nicaragua', 'NI', '+505'),
(159, '2022-12-07 22:47:10.192', '2022-12-07 22:47:10.192', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ne.svg', 'Niger', 'NE', '+227'),
(160, '2022-12-07 22:47:10.208', '2022-12-07 22:47:10.208', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ng.svg', 'Nigeria', 'NG', '+234'),
(161, '2022-12-07 22:47:10.226', '2022-12-07 22:47:10.226', 1, 'https://cdn.kcak11.com/CountryFlags/countries/nu.svg', 'Niue', 'NU', '+683'),
(162, '2022-12-07 22:47:10.250', '2022-12-07 22:47:10.250', 1, 'https://cdn.kcak11.com/CountryFlags/countries/nf.svg', 'Norfolk Island', 'NF', '+672'),
(163, '2022-12-07 22:47:10.265', '2022-12-07 22:47:10.265', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mk.svg', 'North Macedonia', 'MK', '+389'),
(164, '2022-12-07 22:47:10.280', '2022-12-07 22:47:10.280', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mp.svg', 'Northern Mariana Islands', 'MP', '+1670'),
(165, '2022-12-07 22:47:10.297', '2022-12-07 22:47:10.297', 1, 'https://cdn.kcak11.com/CountryFlags/countries/no.svg', 'Norway', 'NO', '+47'),
(166, '2022-12-07 22:47:10.322', '2022-12-07 22:47:10.322', 1, 'https://cdn.kcak11.com/CountryFlags/countries/om.svg', 'Oman', 'OM', '+968'),
(167, '2022-12-07 22:47:10.384', '2022-12-07 22:47:10.384', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pk.svg', 'Pakistan', 'PK', '+92'),
(168, '2022-12-07 22:47:10.400', '2022-12-07 22:47:10.400', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pw.svg', 'Palau', 'PW', '+680'),
(169, '2022-12-07 22:47:10.417', '2022-12-07 22:47:10.417', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ps.svg', 'Palestine', 'PS', '+970'),
(170, '2022-12-07 22:47:10.433', '2022-12-07 22:47:10.433', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pa.svg', 'Panama', 'PA', '+507'),
(171, '2022-12-07 22:47:10.451', '2022-12-07 22:47:10.451', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pg.svg', 'Papua New Guinea', 'PG', '+675'),
(172, '2022-12-07 22:47:10.466', '2022-12-07 22:47:10.466', 1, 'https://cdn.kcak11.com/CountryFlags/countries/py.svg', 'Paraguay', 'PY', '+595'),
(173, '2022-12-07 22:47:10.484', '2022-12-07 22:47:10.484', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pe.svg', 'Peru', 'PE', '+51'),
(174, '2022-12-07 22:47:10.500', '2022-12-07 22:47:10.500', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ph.svg', 'Philippines', 'PH', '+63'),
(175, '2022-12-07 22:47:10.517', '2022-12-07 22:47:10.517', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pn.svg', 'Pitcairn', 'PN', '+872'),
(176, '2022-12-07 22:47:10.541', '2022-12-07 22:47:10.541', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pl.svg', 'Poland', 'PL', '+48'),
(177, '2022-12-07 22:47:10.857', '2022-12-07 22:47:10.857', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pt.svg', 'Portugal', 'PT', '+351'),
(178, '2022-12-07 22:47:10.938', '2022-12-07 22:47:10.938', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pr.svg', 'Puerto Rico', 'PR', '+1939'),
(179, '2022-12-07 22:47:10.983', '2022-12-07 22:47:10.983', 1, 'https://cdn.kcak11.com/CountryFlags/countries/qa.svg', 'Qatar', 'QA', '+974'),
(180, '2022-12-07 22:47:11.000', '2022-12-07 22:47:11.000', 1, 'https://cdn.kcak11.com/CountryFlags/countries/re.svg', 'Reunion', 'RE', '+262'),
(181, '2022-12-07 22:47:11.024', '2022-12-07 22:47:11.024', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ro.svg', 'Romania', 'RO', '+40'),
(182, '2022-12-07 22:47:11.042', '2022-12-07 22:47:11.042', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ru.svg', 'Russia', 'RU', '+7'),
(183, '2022-12-07 22:47:11.063', '2022-12-07 22:47:11.063', 1, 'https://cdn.kcak11.com/CountryFlags/countries/rw.svg', 'Rwanda', 'RW', '+250'),
(184, '2022-12-07 22:47:11.079', '2022-12-07 22:47:11.079', 1, 'https://cdn.kcak11.com/CountryFlags/countries/bl.svg', 'Saint Barthelemy', 'BL', '+590'),
(185, '2022-12-07 22:47:11.104', '2022-12-07 22:47:11.104', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sh.svg', 'Saint Helena, Ascension and Tristan Da Cunha', 'SH', '+290'),
(186, '2022-12-07 22:47:11.133', '2022-12-07 22:47:11.133', 1, 'https://cdn.kcak11.com/CountryFlags/countries/kn.svg', 'Saint Kitts and Nevis', 'KN', '+1869'),
(187, '2022-12-07 22:47:11.157', '2022-12-07 22:47:11.157', 1, 'https://cdn.kcak11.com/CountryFlags/countries/lc.svg', 'Saint Lucia', 'LC', '+1758'),
(188, '2022-12-07 22:47:11.183', '2022-12-07 22:47:11.183', 1, 'https://cdn.kcak11.com/CountryFlags/countries/mf.svg', 'Saint Martin', 'MF', '+590'),
(189, '2022-12-07 22:47:11.216', '2022-12-07 22:47:11.216', 1, 'https://cdn.kcak11.com/CountryFlags/countries/pm.svg', 'Saint Pierre and Miquelon', 'PM', '+508'),
(190, '2022-12-07 22:47:11.233', '2022-12-07 22:47:11.233', 1, 'https://cdn.kcak11.com/CountryFlags/countries/vc.svg', 'Saint Vincent and the Grenadines', 'VC', '+1784'),
(191, '2022-12-07 22:47:11.262', '2022-12-07 22:47:11.262', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ws.svg', 'Samoa', 'WS', '+685'),
(192, '2022-12-07 22:47:11.279', '2022-12-07 22:47:11.279', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sm.svg', 'San Marino', 'SM', '+378'),
(193, '2022-12-07 22:47:11.313', '2022-12-07 22:47:11.313', 1, 'https://cdn.kcak11.com/CountryFlags/countries/st.svg', 'Sao Tome and Principe', 'ST', '+239'),
(194, '2022-12-07 22:47:11.332', '2022-12-07 22:47:11.332', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sa.svg', 'Saudi Arabia', 'SA', '+966'),
(195, '2022-12-07 22:47:11.358', '2022-12-07 22:47:11.358', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sn.svg', 'Senegal', 'SN', '+221'),
(196, '2022-12-07 22:47:11.375', '2022-12-07 22:47:11.375', 1, 'https://cdn.kcak11.com/CountryFlags/countries/rs.svg', 'Serbia', 'RS', '+381'),
(197, '2022-12-07 22:47:11.417', '2022-12-07 22:47:11.417', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sc.svg', 'Seychelles', 'SC', '+248'),
(198, '2022-12-07 22:47:11.441', '2022-12-07 22:47:11.441', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sl.svg', 'Sierra Leone', 'SL', '+232'),
(199, '2022-12-07 22:47:11.458', '2022-12-07 22:47:11.458', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sg.svg', 'Singapore', 'SG', '+65'),
(200, '2022-12-07 22:47:11.483', '2022-12-07 22:47:11.483', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sx.svg', 'Sint Maarten', 'SX', '+1721'),
(201, '2022-12-07 22:47:11.500', '2022-12-07 22:47:11.500', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sk.svg', 'Slovakia', 'SK', '+421'),
(202, '2022-12-07 22:47:11.524', '2022-12-07 22:47:11.524', 1, 'https://cdn.kcak11.com/CountryFlags/countries/si.svg', 'Slovenia', 'SI', '+386'),
(203, '2022-12-07 22:47:11.564', '2022-12-07 22:47:11.564', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sb.svg', 'Solomon Islands', 'SB', '+677'),
(204, '2022-12-07 22:47:11.584', '2022-12-07 22:47:11.584', 1, 'https://cdn.kcak11.com/CountryFlags/countries/so.svg', 'Somalia', 'SO', '+252'),
(205, '2022-12-07 22:47:11.608', '2022-12-07 22:47:11.608', 1, 'https://cdn.kcak11.com/CountryFlags/countries/za.svg', 'South Africa', 'ZA', '+27'),
(206, '2022-12-07 22:47:11.625', '2022-12-07 22:47:11.625', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gs.svg', 'South Georgia and the South Sandwich Islands', 'GS', '+500'),
(207, '2022-12-07 22:47:11.649', '2022-12-07 22:47:11.649', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ss.svg', 'South Sudan', 'SS', '+211'),
(208, '2022-12-07 22:47:11.697', '2022-12-07 22:47:11.697', 1, 'https://cdn.kcak11.com/CountryFlags/countries/es.svg', 'Spain', 'ES', '+34'),
(209, '2022-12-07 22:47:11.720', '2022-12-07 22:47:11.720', 1, 'https://cdn.kcak11.com/CountryFlags/countries/lk.svg', 'Sri Lanka', 'LK', '+94'),
(210, '2022-12-07 22:47:11.738', '2022-12-07 22:47:11.738', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sd.svg', 'Sudan', 'SD', '+249'),
(211, '2022-12-07 22:47:11.762', '2022-12-07 22:47:11.762', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sr.svg', 'Suriname', 'SR', '+597'),
(212, '2022-12-07 22:47:11.780', '2022-12-07 22:47:11.780', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sj.svg', 'Svalbard and Jan Mayen', 'SJ', '+47'),
(213, '2022-12-07 22:47:11.808', '2022-12-07 22:47:11.808', 1, 'https://cdn.kcak11.com/CountryFlags/countries/se.svg', 'Sweden', 'SE', '+46'),
(214, '2022-12-07 22:47:11.825', '2022-12-07 22:47:11.825', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ch.svg', 'Switzerland', 'CH', '+41'),
(215, '2022-12-07 22:47:11.849', '2022-12-07 22:47:11.849', 1, 'https://cdn.kcak11.com/CountryFlags/countries/sy.svg', 'Syrian Arab Republic', 'SY', '+963'),
(216, '2022-12-07 22:47:11.908', '2022-12-07 22:47:11.908', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tw.svg', 'Taiwan', 'TW', '+886'),
(217, '2022-12-07 22:47:12.016', '2022-12-07 22:47:12.016', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tj.svg', 'Tajikistan', 'TJ', '+992'),
(218, '2022-12-07 22:47:12.075', '2022-12-07 22:47:12.075', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tz.svg', 'Tanzania, United Republic of Tanzania', 'TZ', '+255'),
(219, '2022-12-07 22:47:12.108', '2022-12-07 22:47:12.108', 1, 'https://cdn.kcak11.com/CountryFlags/countries/th.svg', 'Thailand', 'TH', '+66'),
(220, '2022-12-07 22:47:12.125', '2022-12-07 22:47:12.125', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tl.svg', 'Timor-Leste', 'TL', '+670'),
(221, '2022-12-07 22:47:12.149', '2022-12-07 22:47:12.149', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tg.svg', 'Togo', 'TG', '+228'),
(222, '2022-12-07 22:47:12.167', '2022-12-07 22:47:12.167', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tk.svg', 'Tokelau', 'TK', '+690'),
(223, '2022-12-07 22:47:12.191', '2022-12-07 22:47:12.191', 1, 'https://cdn.kcak11.com/CountryFlags/countries/to.svg', 'Tonga', 'TO', '+676'),
(224, '2022-12-07 22:47:12.208', '2022-12-07 22:47:12.208', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tt.svg', 'Trinidad and Tobago', 'TT', '+1868'),
(225, '2022-12-07 22:47:12.233', '2022-12-07 22:47:12.233', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tn.svg', 'Tunisia', 'TN', '+216'),
(226, '2022-12-07 22:47:12.250', '2022-12-07 22:47:12.250', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tr.svg', 'Turkey', 'TR', '+90'),
(227, '2022-12-07 22:47:12.274', '2022-12-07 22:47:12.274', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tm.svg', 'Turkmenistan', 'TM', '+993'),
(228, '2022-12-07 22:47:12.292', '2022-12-07 22:47:12.292', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tc.svg', 'Turks and Caicos Islands', 'TC', '+1649'),
(229, '2022-12-07 22:47:12.317', '2022-12-07 22:47:12.317', 1, 'https://cdn.kcak11.com/CountryFlags/countries/tv.svg', 'Tuvalu', 'TV', '+688'),
(230, '2022-12-07 22:47:12.334', '2022-12-07 22:47:12.334', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ug.svg', 'Uganda', 'UG', '+256'),
(231, '2022-12-07 22:47:12.358', '2022-12-07 22:47:12.358', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ua.svg', 'Ukraine', 'UA', '+380'),
(232, '2022-12-07 22:47:12.375', '2022-12-07 22:47:12.375', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ae.svg', 'United Arab Emirates', 'AE', '+971'),
(233, '2022-12-07 22:47:12.399', '2022-12-07 22:47:12.399', 1, 'https://cdn.kcak11.com/CountryFlags/countries/gb.svg', 'United Kingdom', 'GB', '+44'),
(234, '2022-12-07 22:47:12.417', '2022-12-07 22:47:12.417', 1, 'https://cdn.kcak11.com/CountryFlags/countries/us.svg', 'United States', 'US', '+1'),
(235, '2022-12-07 22:47:12.459', '2022-12-07 22:47:12.459', 1, 'https://cdn.kcak11.com/CountryFlags/countries/umi.svg', 'United States Minor Outlying Islands', 'UMI', '+246'),
(236, '2022-12-07 22:47:12.483', '2022-12-07 22:47:12.483', 1, 'https://cdn.kcak11.com/CountryFlags/countries/uy.svg', 'Uruguay', 'UY', '+598'),
(237, '2022-12-07 22:47:12.500', '2022-12-07 22:47:12.500', 1, 'https://cdn.kcak11.com/CountryFlags/countries/uz.svg', 'Uzbekistan', 'UZ', '+998'),
(238, '2022-12-07 22:47:12.525', '2022-12-07 22:47:12.525', 1, 'https://cdn.kcak11.com/CountryFlags/countries/vu.svg', 'Vanuatu', 'VU', '+678'),
(239, '2022-12-07 22:47:12.539', '2022-12-07 22:47:12.539', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ve.svg', 'Venezuela, Bolivarian Republic of Venezuela', 'VE', '+58'),
(240, '2022-12-07 22:47:12.562', '2022-12-07 22:47:12.562', 1, 'https://cdn.kcak11.com/CountryFlags/countries/vn.svg', 'Vietnam', 'VN', '+84'),
(241, '2022-12-07 22:47:12.584', '2022-12-07 22:47:12.584', 1, 'https://cdn.kcak11.com/CountryFlags/countries/vg.svg', 'Virgin Islands, British', 'VG', '+1284'),
(242, '2022-12-07 22:47:12.608', '2022-12-07 22:47:12.608', 1, 'https://cdn.kcak11.com/CountryFlags/countries/vi.svg', 'Virgin Islands, U.S.', 'VI', '+1340'),
(243, '2022-12-07 22:47:12.625', '2022-12-07 22:47:12.625', 1, 'https://cdn.kcak11.com/CountryFlags/countries/wf.svg', 'Wallis and Futuna', 'WF', '+681'),
(244, '2022-12-07 22:47:12.650', '2022-12-07 22:47:12.650', 1, 'https://cdn.kcak11.com/CountryFlags/countries/ye.svg', 'Yemen', 'YE', '+967'),
(245, '2022-12-07 22:47:12.667', '2022-12-07 22:47:12.667', 1, 'https://cdn.kcak11.com/CountryFlags/countries/zm.svg', 'Zambia', 'ZM', '+260'),
(246, '2022-12-07 22:47:12.687', '2022-12-07 22:47:12.687', 1, 'https://cdn.kcak11.com/CountryFlags/countries/zw.svg', 'Zimbabwe', 'ZW', '+263');

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `created_at`, `updated_at`, `read_at`, `message_from_workspace`, `messaging_product`, `message_id`, `type`, `body_text`, `contact_id`, `workspace_channel_id`, `conversation_id`) VALUES
(151, '2023-02-11 13:45:17.121', '2023-02-11 13:45:17.121', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIDQzODdFQUQyQTgyOENDQzBDRDZBQTI1ODc4N0MyQzYwAA==', 'text', 'hello', 18, 9, 5),
(152, '2023-02-11 13:45:32.835', '2023-02-11 13:45:32.835', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEkNFNEVCNUQzNTYzMjVEMkEyRgA=', 'text', 'hi sojeb', 18, 9, 5),
(153, '2023-02-11 13:46:26.650', '2023-02-11 13:46:26.650', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIEY2NUFGRTUwOEQ5OTJBRDZEOTI1QTNBQzU0OTY3NjIyAA==', 'text', 'what\'s up', 18, 9, 5),
(154, '2023-02-11 13:46:37.013', '2023-02-11 13:46:37.013', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjVDMzFCODcyRTVFOTA5NDA4NQA=', 'text', 'good, what about you', 18, 9, 5),
(155, '2023-02-11 13:46:48.103', '2023-02-11 13:46:48.103', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEkI5QzQxQjNGMkUxQjVEOTJDNAA=', 'text', 'Are you interested to buy some products from us?', 18, 9, 5),
(156, '2023-02-11 13:46:54.409', '2023-02-11 13:46:54.409', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIDFERkY2MTk5QkM4QTUxQkI5MjdGNjVBNjhEOTMwQTRDAA==', 'text', 'sure why not', 18, 9, 5),
(157, '2023-02-11 13:47:06.406', '2023-02-11 13:47:06.406', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjU5OUY5OEFGRDgwNDIxRTg5OQA=', 'text', 'sojebsikder null,Welcome here.', 18, 9, 5),
(158, '2023-02-11 13:47:19.561', '2023-02-11 13:47:19.561', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIDlDM0ZGRkI4MzQ1NDlCQ0FFMjREMzg5NEZDRkI4ODY0AA==', 'text', 'thank you, can you now show me some products', 18, 9, 5),
(159, '2023-02-11 13:47:32.829', '2023-02-11 13:47:32.829', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEkUxMUY3REFGRkMwMkExQTJCNwA=', 'text', ' sojebsikder sure brother, I\'m on it.', 18, 9, 5),
(160, '2023-02-11 13:48:00.249', '2023-02-11 13:48:00.249', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIDk1NjNGNEM4OTQ3MUJCRTBBOUQ0QUQ5ODQ3NURGODc2AA==', 'text', 'by the way, this system is pretty cool', 18, 9, 5),
(161, '2023-02-11 13:48:19.549', '2023-02-11 13:48:19.549', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjQ0RUFCNEZBMTRGM0RENDUzMAA=', 'text', 'thank you so much brother, I made it myself', 18, 9, 5),
(162, '2023-02-11 13:48:25.019', '2023-02-11 13:48:25.019', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIDZCRjQ0MTc0MTAxMkMzN0E5OTg1MzU4RUEzQjZFOTQ1AA==', 'text', 'ohh cool brother', 18, 9, 5),
(163, '2023-02-11 13:48:35.430', '2023-02-11 13:48:35.430', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjMzMjA0QUUyREY4QUU2RjI4OQA=', 'text', 'Thank you  🙃', 18, 9, 5),
(164, '2023-02-11 13:54:55.174', '2023-02-11 13:54:55.174', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIEQxQTgzODQyRjlGMEFCQzJDQkE5QTQ4NzMxRUNBNENGAA==', 'text', 'hey buddy', 18, 9, 5),
(165, '2023-02-11 13:55:36.974', '2023-02-11 13:55:36.974', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEkZDMUQ2RkExMjZCQ0YwMkJDNAA=', 'text', 'hey buddy', 18, 9, 5),
(166, '2023-02-11 13:59:37.215', '2023-02-11 13:59:37.215', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIEE1MDZCMDg3QjU0MjRFMzFGOENEOUE4QUU5M0JGNUEyAA==', 'text', 'hey', 18, 9, 5),
(167, '2023-02-11 14:00:48.831', '2023-02-11 14:00:48.831', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjhCRTBDOTM0NTAwNjRBRURCNgA=', 'text', 'hey buddy', 18, 9, 5),
(168, '2023-02-11 14:01:36.233', '2023-02-11 14:01:36.233', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYIDY5MkFERTM4RjgwMUQ4NDQzNDgzODU5NEM1RkFCRDIzAA==', 'text', 'what message type currently this system support bro?', 18, 9, 5),
(169, '2023-02-11 14:02:07.727', '2023-02-11 14:02:07.727', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEkY5OTMxNjI1NkYzNEY2QUVFNQA=', 'text', 'Yeah now currently this support only text, but later we will support voice, template as well', 18, 9, 5),
(170, '2023-02-11 15:30:40.912', '2023-02-11 15:30:40.912', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjM3NTc1NDY3OEEyMjE4QzhFRQA=', 'text', 'do you know what is snippet?', 18, 9, 5),
(171, '2023-02-11 15:31:47.507', '2023-02-11 15:31:47.507', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEkJGQzBCMzBFOEU4MUE1MzRCOQA=', 'text', 'do you know what is snippet 2?', 18, 9, 5),
(172, '2023-02-11 15:53:45.324', '2023-02-11 15:53:45.324', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjNEMEEzQzY0OTg4QUEzMTY1OQA=', 'text', 'hey buddy', 18, 9, 5),
(173, '2023-02-11 15:59:06.444', '2023-02-11 15:59:06.444', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYFDNFQjBFQ0FCQkZFQkZEQkVBMzNEAA==', 'text', 'hello buddy, I was offline', 18, 9, 5),
(174, '2023-02-11 16:01:34.482', '2023-02-11 16:01:34.482', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjAxM0Q1QUZGQzkwRkQxNTczRgA=', 'text', 'ohh i see', 18, 9, 5),
(175, '2023-02-11 16:02:28.972', '2023-02-11 16:02:28.972', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYFDNFQjA1QTNBQUEwOUI3QTc4QjM4AA==', 'text', 'yeah', 18, 9, 5),
(176, '2023-02-11 16:02:36.502', '2023-02-11 16:02:36.502', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjY4Rjc3MzMyRTMyN0JBRUM1QwA=', 'text', 'ok', 18, 9, 5),
(177, '2023-02-11 16:03:38.364', '2023-02-11 16:03:38.364', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYFDNFQjBCOTU1RDBEMEM1MUY0MjgwAA==', 'text', 'yeah', 18, 9, 5),
(178, '2023-02-11 16:03:52.769', '2023-02-11 16:03:52.769', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjUyMkJEMjQzMjBFRTNCQUEyNgA=', 'text', 'okay cool, let\'s not go loop', 18, 9, 5),
(179, '2023-02-11 16:05:53.536', '2023-02-11 16:05:53.536', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjc4N0ZBQTM4OEM5QjcyRUY4QwA=', 'text', 'send 1', 18, 9, 5),
(180, '2023-02-11 16:07:33.102', '2023-02-11 16:07:33.102', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjJBRTU5NzE0NEE4QTFCNUNCNgA=', 'text', 'send 2', 18, 9, 5),
(181, '2023-02-11 16:07:45.572', '2023-02-11 16:07:45.572', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYFDNFQjA1N0Y0MUM0MzgyMkY5NEFFAA==', 'text', 'send 3', 18, 9, 5),
(182, '2023-02-11 16:08:24.531', '2023-02-11 16:08:24.531', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEkRGQjI0MzVBMkQzMUJBN0MxQQA=', 'text', 'send 4', 18, 9, 5),
(183, '2023-02-11 16:08:36.234', '2023-02-11 16:08:36.234', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYFDNFQjBCOTRGRkFBRjkzMEVBNUFBAA==', 'text', 'send 5', 18, 9, 5),
(184, '2023-02-11 16:08:58.772', '2023-02-11 16:08:58.772', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYFDNFQjA5QkUyRjlFQUFDRTdFRDFBAA==', 'text', 'send 6', 18, 9, 5),
(185, '2023-02-11 16:09:05.453', '2023-02-11 16:09:05.453', NULL, 1, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABEYEjJFRTQ3NUExMEY1NUM2NTRGRgA=', 'text', 'send 7', 18, 9, 5),
(186, '2023-02-11 16:09:09.810', '2023-02-11 16:09:09.810', NULL, 0, 'whatsapp', 'wamid.HBgNODgwMTgzMzk2MjU5NRUCABIYFDNFQjAxN0U2QTY1OUE4MEJGRUVGAA==', 'text', 'send 8', 18, 9, 5);

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `name`, `phone_number`, `website`, `trial_end_at`) VALUES
(1, '2022-12-19 13:28:44.284', '2022-12-19 13:28:44.284', NULL, 1, 'organization_xyz', NULL, NULL, '2024-01-10 13:28:44.279');

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `title`, `action`, `subject`, `conditions`, `fields`) VALUES
(1, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'system_tenant_management_read', 'Read', 'SystemTenant', NULL, NULL),
(2, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'system_tenant_management_create', 'Create', 'SystemTenant', NULL, NULL),
(3, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'system_tenant_management_update', 'Update', 'SystemTenant', NULL, NULL),
(4, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'system_tenant_management_show', 'Show', 'SystemTenant', NULL, NULL),
(5, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'system_tenant_management_delete', 'Delete', 'SystemTenant', NULL, NULL),
(6, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'user_management_read', 'Read', 'User', NULL, NULL),
(7, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'user_management_create', 'Create', 'User', NULL, NULL),
(8, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'user_management_update', 'Update', 'User', NULL, NULL),
(9, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'user_management_show', 'Show', 'User', NULL, NULL),
(10, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'user_management_delete', 'Delete', 'User', NULL, NULL),
(11, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'role_management_read', 'Read', 'Role', NULL, NULL),
(12, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'role_management_create', 'Create', 'Role', NULL, NULL),
(13, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'role_management_update', 'Update', 'Role', NULL, NULL),
(14, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'role_management_show', 'Show', 'Role', NULL, NULL),
(15, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'role_management_delete', 'Delete', 'Role', NULL, NULL),
(16, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_management_read', 'Read', 'Workspace', NULL, NULL),
(17, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_management_create', 'Create', 'Workspace', NULL, NULL),
(18, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_management_update', 'Update', 'Workspace', NULL, NULL),
(19, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_management_show', 'Show', 'Workspace', NULL, NULL),
(20, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_management_delete', 'Delete', 'Workspace', NULL, NULL),
(21, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_user_management_read', 'Read', 'WorkspaceUser', NULL, NULL),
(22, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_user_management_create', 'Create', 'WorkspaceUser', NULL, NULL),
(23, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_user_management_update', 'Update', 'WorkspaceUser', NULL, NULL),
(24, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_user_management_show', 'Show', 'WorkspaceUser', NULL, NULL),
(25, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_user_management_delete', 'Delete', 'WorkspaceUser', NULL, NULL),
(26, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_team_management_read', 'Read', 'WorkspaceTeam', NULL, NULL),
(27, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_team_management_create', 'Create', 'WorkspaceTeam', NULL, NULL),
(28, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_team_management_update', 'Update', 'WorkspaceTeam', NULL, NULL),
(29, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_team_management_show', 'Show', 'WorkspaceTeam', NULL, NULL),
(30, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_team_management_delete', 'Delete', 'WorkspaceTeam', NULL, NULL),
(31, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_conversation_management_read', 'Read', 'WorkspaceConversation', NULL, NULL),
(32, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_conversation_management_create', 'Create', 'WorkspaceConversation', NULL, NULL),
(33, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_conversation_management_update', 'Update', 'WorkspaceConversation', NULL, NULL),
(34, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_conversation_management_show', 'Show', 'WorkspaceConversation', NULL, NULL),
(35, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_conversation_management_delete', 'Delete', 'WorkspaceConversation', NULL, NULL),
(36, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_channel_management_read', 'Read', 'WorkspaceChannel', NULL, NULL),
(37, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_channel_management_create', 'Create', 'WorkspaceChannel', NULL, NULL),
(38, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_channel_management_update', 'Update', 'WorkspaceChannel', NULL, NULL),
(39, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_channel_management_show', 'Show', 'WorkspaceChannel', NULL, NULL),
(40, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_channel_management_delete', 'Delete', 'WorkspaceChannel', NULL, NULL),
(41, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_snippet_management_read', 'Read', 'WorkspaceSnippet', NULL, NULL),
(42, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_snippet_management_create', 'Create', 'WorkspaceSnippet', NULL, NULL),
(43, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_snippet_management_update', 'Update', 'WorkspaceSnippet', NULL, NULL),
(44, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_snippet_management_show', 'Show', 'WorkspaceSnippet', NULL, NULL),
(45, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_snippet_management_delete', 'Delete', 'WorkspaceSnippet', NULL, NULL),
(46, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_file_management_read', 'Read', 'WorkspaceFile', NULL, NULL),
(47, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_file_management_create', 'Create', 'WorkspaceFile', NULL, NULL),
(48, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_file_management_update', 'Update', 'WorkspaceFile', NULL, NULL),
(49, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_file_management_show', 'Show', 'WorkspaceFile', NULL, NULL),
(50, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_file_management_delete', 'Delete', 'WorkspaceFile', NULL, NULL),
(51, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_contact_management_read', 'Read', 'WorkspaceContact', NULL, NULL),
(52, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_contact_management_create', 'Create', 'WorkspaceContact', NULL, NULL),
(53, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_contact_management_update', 'Update', 'WorkspaceContact', NULL, NULL),
(54, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_contact_management_show', 'Show', 'WorkspaceContact', NULL, NULL),
(55, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_contact_management_delete', 'Delete', 'WorkspaceContact', NULL, NULL),
(56, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_broadcast_management_read', 'Read', 'WorkspaceBroadcast', NULL, NULL),
(57, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_broadcast_management_create', 'Create', 'WorkspaceBroadcast', NULL, NULL),
(58, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_broadcast_management_update', 'Update', 'WorkspaceBroadcast', NULL, NULL),
(59, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_broadcast_management_show', 'Show', 'WorkspaceBroadcast', NULL, NULL),
(60, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_broadcast_management_delete', 'Delete', 'WorkspaceBroadcast', NULL, NULL),
(61, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_workflow_management_read', 'Read', 'WorkspaceWorkflow', NULL, NULL),
(62, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_workflow_management_create', 'Create', 'WorkspaceWorkflow', NULL, NULL),
(63, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_workflow_management_update', 'Update', 'WorkspaceWorkflow', NULL, NULL),
(64, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_workflow_management_show', 'Show', 'WorkspaceWorkflow', NULL, NULL),
(65, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_workflow_management_delete', 'Delete', 'WorkspaceWorkflow', NULL, NULL),
(66, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_report_management_read', 'Read', 'WorkspaceReport', NULL, NULL),
(67, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_report_management_show', 'Show', 'WorkspaceReport', NULL, NULL),
(68, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_data_backup_management_read', 'Read', 'WorkspaceDataBackup', NULL, NULL),
(69, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'workspace_data_backup_management_create', 'Create', 'WorkspaceDataBackup', NULL, NULL),
(70, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_management_show', 'Show', 'Organization', NULL, NULL),
(71, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_management_update', 'Update', 'Organization', NULL, NULL),
(72, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_user_management_read', 'Read', 'OrganizationUser', NULL, NULL),
(73, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_user_management_create', 'Create', 'OrganizationUser', NULL, NULL),
(74, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_user_management_update', 'Update', 'OrganizationUser', NULL, NULL),
(75, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_user_management_show', 'Show', 'OrganizationUser', NULL, NULL),
(76, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_user_management_delete', 'Delete', 'OrganizationUser', NULL, NULL),
(77, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_billing_management_read', 'Read', 'OrganizationBilling', NULL, NULL),
(78, '2022-12-19 13:28:43.835', '2022-12-19 13:28:43.835', NULL, 1, 'organization_billing_management_create', 'Create', 'OrganizationBilling', NULL, NULL);

--
-- Dumping data for table `permission_roles`
--

INSERT INTO `permission_roles` (`created_at`, `updated_at`, `permission_id`, `role_id`) VALUES
('2022-12-19 13:28:46.425', '2022-12-19 13:28:46.425', 1, 1),
('2022-12-19 13:28:46.425', '2022-12-19 13:28:46.425', 2, 1),
('2022-12-19 13:28:46.425', '2022-12-19 13:28:46.425', 3, 1),
('2022-12-19 13:28:46.425', '2022-12-19 13:28:46.425', 4, 1),
('2022-12-19 13:28:46.425', '2022-12-19 13:28:46.425', 5, 1),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 6, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 7, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 8, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 9, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 10, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 11, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 12, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 13, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 14, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 15, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 16, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 16, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 16, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 17, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 17, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 18, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 18, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 19, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 19, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 19, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 20, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 20, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 21, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 21, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 21, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 22, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 22, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 23, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 23, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 24, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 24, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 25, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 25, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 26, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 27, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 28, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 29, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 30, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 31, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 31, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 31, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 32, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 32, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 32, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 33, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 33, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 33, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 34, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 34, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 34, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 35, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 35, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 35, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 36, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 36, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 37, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 37, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 38, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 38, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 39, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 39, 27),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 40, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 40, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 40, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 41, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 42, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 43, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 44, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 45, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 46, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 47, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 48, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 49, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 50, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 51, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 51, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 51, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 52, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 52, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 52, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 53, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 53, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 53, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 54, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 54, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 54, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 55, 2),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 55, 27),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 55, 28),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 56, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 57, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 58, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 59, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 60, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 61, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 62, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 63, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 64, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 65, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 66, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 67, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 68, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 69, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 70, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 71, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 72, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 73, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 74, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 75, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 76, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 77, 2),
('2022-12-19 13:28:46.504', '2022-12-19 13:28:46.504', 78, 2);

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `created_at`, `updated_at`, `status`, `name`, `plan_price_id`, `price_per_month`) VALUES
(1, '2022-12-19 13:28:46.635', '2022-12-19 13:28:46.635', 1, 'Team', 'price_1MEvhxJ1sD6uaGBLDQ2DqVEK', '99.000000000000000000000000000000'),
(2, '2022-12-19 13:28:46.635', '2022-12-19 13:28:46.635', 1, 'Business', 'price_1MEviEJ1sD6uaGBLIbqAWP2Z', '299.000000000000000000000000000000');

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `title`, `name`, `tenant_id`, `workspace_id`) VALUES
(1, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'Super Admin', 'su-admin', NULL, NULL),
(2, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'Admin', 'admin', NULL, NULL),
(3, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'Billing Admin', 'billing-admin', NULL, NULL),
(4, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'User Admin', 'user-admin', NULL, NULL),
(5, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'Member', 'member', NULL, NULL),
(6, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'Owner', 'owner', NULL, NULL),
(7, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'Manager', 'manager', NULL, NULL),
(8, '2022-12-19 13:28:43.513', '2022-12-19 13:28:43.513', NULL, 1, 'Agent', 'agent', NULL, NULL),
(15, '2022-12-20 12:15:50.445', '2022-12-20 12:15:50.445', NULL, 1, 'agent', NULL, 1, 1),
(27, '2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', NULL, 1, 'user admin', NULL, 1, 7),
(28, '2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', NULL, 1, 'agent', NULL, 1, 7);

--
-- Dumping data for table `role_users`
--

INSERT INTO `role_users` (`created_at`, `updated_at`, `role_id`, `user_id`) VALUES
('2022-12-19 13:28:46.220', '2022-12-19 13:28:46.220', 1, 1),
('2022-12-19 13:28:45.180', '2022-12-19 13:28:45.180', 2, 2),
('2023-01-18 16:27:12.108', '2023-01-18 16:27:12.108', 15, 15),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 27, 2);

--
-- Dumping data for table `snippets`
--

INSERT INTO `snippets` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `name`, `message`, `workspace_id`, `tenant_id`) VALUES
(1, '2023-02-04 11:39:42.514', '2023-02-04 11:39:42.514', NULL, 1, 'welcome', 'hi, ${contact.name},\nWelcome here.', 1, 1),
(2, '2023-02-04 13:10:23.244', '2023-02-04 13:10:23.244', NULL, 1, 'good bye', 'Okay ${contact.fname}, if you have any problem, let us know.\nThank you.', 1, 1);

--
-- Dumping data for table `ucodes`
--

INSERT INTO `ucodes` (`id`, `created_at`, `updated_at`, `status`, `user_id`, `token`, `email`, `expired_at`) VALUES
(5, '2023-01-18 16:19:48.104', '2023-01-18 16:19:48.104', 1, NULL, '2d95a654-4139-44d9-ab1b-fb48f43bea54', 'sojebsikder10@gmail.com', '2023-02-17 16:19:47.896'),
(6, '2023-01-18 16:21:29.321', '2023-01-18 16:21:29.321', 1, NULL, '869fa4be-6e42-40df-9d17-f65fdaa4e9ee', 'sojebsikder10@gmail.com', '2023-02-17 16:21:29.217'),
(7, '2023-01-18 16:23:28.693', '2023-01-18 16:23:28.693', 1, NULL, '0e79a927-be00-4bde-a190-6506f78047b4', 'sojebsikder10@gmail.com', '2023-02-17 16:23:28.599');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `availability`, `email`, `username`, `fname`, `lname`, `password`, `domain`, `avatar`, `billing_id`, `tenant_id`) VALUES
(1, '2022-12-19 13:28:44.145', '2022-12-19 13:28:44.145', NULL, 1, NULL, 'admin@example.com', 'admin', NULL, NULL, '$2b$10$kfkaE67LbTRZf2xP1zQTUe7DXd5vPFtoWGi7nrTJFeiZDMFXvsFpO', NULL, NULL, NULL, NULL),
(2, '2022-12-19 13:28:44.736', '2022-12-19 13:28:44.736', NULL, 1, NULL, 'sojebsikder@gmail.com', 'sojebsikder', 'sojeb', 'sikder', '$2b$10$NEAnTTQ80syyXv6I5rzpwub/z1ige.gykh1GHUK6YfLwFyvEUn6Fa', NULL, NULL, NULL, 1),
(15, '2023-01-18 16:27:12.000', '2023-01-18 16:27:12.000', NULL, 1, NULL, 'sojebsikder10@gmail.com', 'sikdersojeb', 'Sikder', 'Sojeb', '$2b$10$dWR5LtigPlw5IHj8bAozfutbSlFQ0nCx41vY3oCIYTsMQVTo8yTfq', NULL, NULL, NULL, 1);

--
-- Dumping data for table `whatsapp_channels`
--

INSERT INTO `whatsapp_channels` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `channel_type`, `avatar`, `address`, `description`, `email`, `vertical`, `website_1`, `website_2`, `channel_name`, `whatsapp_phone_number`, `whatsapp_business_account_name`, `whatsapp_verified_name`, `webhook_key`, `verify_token`, `access_token`, `account_id`, `phone_number_id`, `verified`, `quality_rating`, `channel_id`, `workspace_id`, `tenant_id`) VALUES
(9, '2023-02-11 13:43:10.573', '2023-02-11 13:43:10.573', NULL, 1, 'whatsapp', NULL, NULL, NULL, NULL, 'UNDEFINED', NULL, NULL, 'WhatsApp Cloud API', '15550153413', NULL, NULL, '1676122990563.4006', 'sojeb_webhook_token', 'EAAMBZBUByhEEBAD0YRaV4AB0qH5jbtNYOxjDCtn1546GH3etWVVG5UN055rETeJZB0LQBmkHSsUYIcJYKnZCyKi2TwZCT19ZAuwsyv9LXZAjJB9W43MNxnUL40hH1hslQ3ArxN9ePZC6trxXbNnvd9JaHB0G6ySZC7ZAUyJF1AJXljw1ChPaR3sil', '105708749047752', '111404165137829', 1, 'GREEN', NULL, 1, 1);

--
-- Dumping data for table `workspaces`
--

INSERT INTO `workspaces` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `name`, `timezone`, `tenant_id`) VALUES
(1, '2022-12-19 13:28:45.282', '2022-12-19 13:28:45.282', NULL, 1, 'My New Workspace', NULL, 1),
(7, '2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', NULL, 1, 'sojebstore', NULL, 1);

--
-- Dumping data for table `workspace_users`
--

INSERT INTO `workspace_users` (`created_at`, `updated_at`, `workspace_id`, `user_id`, `tenant_id`) VALUES
('2022-12-19 13:28:45.633', '2022-12-19 13:28:45.633', 1, 2, 1),
('2023-01-18 16:28:10.994', '2023-01-18 16:28:10.994', 1, 15, 1),
('2023-01-22 11:03:06.801', '2023-01-22 11:03:06.801', 7, 2, 1);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
