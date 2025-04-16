-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 16 avr. 2025 à 15:32
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `php_fullstack_test`
--

-- --------------------------------------------------------

--
-- Structure de la table `Brand`
--

CREATE TABLE `Brand` (
  `brand_id` int(10) UNSIGNED NOT NULL,
  `brand_name` text NOT NULL,
  `brand_image` text NOT NULL,
  `rating` int(11) NOT NULL,
  `country` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `Brand`
--

INSERT INTO `Brand` (`brand_id`, `brand_name`, `brand_image`, `rating`, `country`) VALUES
(1, 'brand1', '/home/ntet/Téléchargements', 4, NULL),
(2, 'brand2', '/home/ntet/Téléchargements', 3, 'EN'),
(3, 'brand3', '/home/ntet/Téléchargements', 2, 'FR');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Brand`
--
ALTER TABLE `Brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Brand`
--
ALTER TABLE `Brand`
  MODIFY `brand_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
