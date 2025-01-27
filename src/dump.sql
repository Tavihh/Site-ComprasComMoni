/*M!999999\- enable the sandbox mode */ 

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;
DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES
(1,'Sabonete','2025-01-18 23:18:33','2025-01-18 23:18:33'),
(2,'Creme','2025-01-18 23:31:06','2025-01-18 23:31:06'),
(3,'Desodorante','2025-01-18 23:35:31','2025-01-18 23:35:31'),
(4,'Colônia','2025-01-19 00:24:25','2025-01-19 00:24:25'),
(5,'Refil','2025-01-19 00:39:06','2025-01-19 00:39:06');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produtos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `path_foto` text NOT NULL,
  `link` text DEFAULT '',
  `categoria` int(11) DEFAULT NULL,
  `telefone` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_telefone` (`telefone`),
  KEY `fk_categoria` (`categoria`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `fk_telefone` FOREIGN KEY (`telefone`) REFERENCES `users` (`telefone`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES
(14,'Matte Real Base Liquida Matte á prova D\'água 20ml',20.99,'1737214620130135430.jpg','',2,'62985490000','2025-01-18 15:37:00','2025-01-18 23:33:40'),
(29,'Desodorante Roll On 300Km/H Max Turbo 50ml',6.99,'1737243487858desodorante 300Km.jpg','',3,'62985490000','2025-01-18 23:38:07','2025-01-18 23:39:56'),
(30,'Desodorante Roll On Musk Marine 50ml',6.99,'1737243617868Desodorante Musk.jpg','',3,'62985490000','2025-01-18 23:40:17','2025-01-18 23:40:17'),
(31,'Desodorante Roll On 300Km/H Quantum 50ml',6.99,'1737243659268Desodorante 300km quantum.jpg','',3,'62985490000','2025-01-18 23:40:59','2025-01-19 00:00:16'),
(32,'Desodorante Roll On Erva Doce 50ml',6.99,'1737243716937Desodorante Erva Doce.jpg','',3,'62985490000','2025-01-18 23:41:56','2025-01-18 23:41:56'),
(33,'Desodorante Roll On Aquavibe Pretty Blue 50ml',6.99,'1737243871662Desodorante pretty blue.jpg','',3,'62985490000','2025-01-18 23:44:31','2025-01-19 00:00:11'),
(34,'Desodorante Roll On Segno 50ml',6.99,'1737243952667Desodorante Segno.jpg','',3,'62985490000','2025-01-18 23:45:52','2025-01-18 23:45:52'),
(35,'Desodorante Roll On Lov|U 50ml',6.99,'1737244066660Desodorante Loviu.jpg','',3,'62985490000','2025-01-18 23:47:46','2025-01-18 23:47:46'),
(36,'Desodorante Roll On Petit 50ml',6.99,'1737244151183Desodorante Petit.jpg','',3,'62985490000','2025-01-18 23:49:11','2025-01-18 23:49:11'),
(37,'Desodorante Roll On Pur Blanca 50ml',6.99,'1737244245454Desodorante Pur Blanca.jpg','',3,'62985490000','2025-01-18 23:50:45','2025-01-18 23:50:45'),
(38,'Desodorante Roll On Aquavibe Baby Smell 50ml',6.99,'1737244289277Desodorante Baby Smell.jpg','',3,'62985490000','2025-01-18 23:51:29','2025-01-18 23:51:29'),
(39,'Desodorante Roll On Imari Rouge 50ml',6.99,'1737244437212Desodorante Imari.jpg','',3,'62985490000','2025-01-18 23:53:57','2025-01-18 23:53:57'),
(40,'Creme Facial Uniformizador Avon Care 100g',25.99,'1737244932655Avon Care - Creme facil uniformizador.jpg','',2,'62985490000','2025-01-19 00:02:12','2025-01-19 00:04:53'),
(41,'Sabonete em Barra Puro Vegetal Tododia Algodão 5uni 90g cada',27.99,'1737245087392Sabonete em barra algodao.jpg','',1,'62985490000','2025-01-19 00:04:47','2025-01-19 00:04:47'),
(42,'Sabonete em Barra Tododia Todanoite 5uni 90g cada',27.99,'1737245256435sabonete em barra cha de camomila e lavanda.jpg','',1,'62985490000','2025-01-19 00:07:36','2025-01-19 00:07:36'),
(43,'Sabonete em Barra Puro Vegetal Tododia Amora Vermelha e Jabuticaba 5uni 90g cada',27.99,'1737245383678sabonete em barra amora vermelha e jabuticaba.jpg','',1,'62985490000','2025-01-19 00:09:43','2025-01-19 00:11:17'),
(44,'Creme Noturno Para o Corpo Tododia Todanoite Chá de Camomila e Lavanda 400ml',54.99,'1737245782985Creme para o corpo cha de camomila e lavanda.jpg','',2,'62985490000','2025-01-19 00:16:23','2025-01-19 00:16:36'),
(45,'Creme Desodorante Nutritivo para o Corpo Tododia Amora Vermelha e Jabuticaba 400ml',54.99,'1737245932967Creme para o Corpo Amora vermelha.jpg','',2,'62985490000','2025-01-19 00:18:52','2025-01-19 00:18:52'),
(46,'Creme Sorbet Desodorante Nutritivo Para o Corpo Tododia Manga Rosa e Água de Coco 400ml',54.99,'1737245977157Creme para o corpo Manga Rosa.jpg','',2,'62985490000','2025-01-19 00:19:37','2025-01-19 00:19:37'),
(47,'Sabonete Mamãe e Bebê 5uni 100g cada',45.99,'1737246115271Sabonete MamÃ£e e bebÃª.jpg','',1,'62985490000','2025-01-19 00:21:55','2025-01-19 00:28:45'),
(48,'Mamãe e Bebê Água de Colônia 100ml',99.99,'1737246345311mamae e bebe agua de colonia.jpg','',4,'62985490000','2025-01-19 00:25:45','2025-01-19 00:25:45'),
(49,'Desodorante Antitranspirante Roll On Erva Doce 70ml',26.99,'1737246514680Desodorante Antitraspirante Rollon Erva Doce.jpg','',3,'62985490000','2025-01-19 00:28:34','2025-01-19 00:28:34'),
(50,'Desodorante Antitranspirante Roll on Tododia Amora Vermelha e Jabuticaba 70ml',26.99,'1737246588609Desodorante Antitraspirante Rollon Amora Vermelha.jpg','',3,'62985490000','2025-01-19 00:29:48','2025-01-19 01:14:07'),
(51,'Desodorante Antitranspirante Roll On Natura Homem Dom 75ml',26.99,'1737246654197Desodorante Homem Dom.jpg','',3,'62985490000','2025-01-19 00:30:54','2025-01-19 00:30:54'),
(52,'Luvas de Silicone Creme Protetor para as Mãos 120g',19.99,'1737246838573Creme para as mÃ£os luvas de silicone.jpg','',2,'62985490000','2025-01-19 00:33:58','2025-01-19 00:33:58'),
(53,'Sabonete Puro Vegetal Cremoso Erva Doce 3uni 90g cada',26.99,'1737247045938Sabonete puro vegetal cremoso em barra 3uni.jpg','',1,'62985490000','2025-01-19 00:37:25','2025-01-19 00:37:25'),
(54,'Refil Creme Desodorante Nutritivo para o Corpo Tododia Algodão 400ml',39.99,'1737247168615refil creme para o corpo algodao.jpg','',5,'62985490000','2025-01-19 00:39:28','2025-01-19 00:39:28'),
(56,'Sabonete Intimo com Aroma de Barbatimão 250ml',14.99,'1737248203567sabonete_barbatimao_250ml.jpg','',1,'62985490000','2025-01-19 00:56:43','2025-01-19 00:59:27'),
(57,'Gel com Arnica e Erva Santa Maria 200g',14.99,'1737248359434Gel com arnica e Erva Santa Maria.jpg','',2,'62985490000','2025-01-19 00:59:19','2025-01-19 00:59:19');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `sobrenome` varchar(255) NOT NULL,
  `telefone` varchar(15) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Otávio','Santiago','62985490000','otaviosatago@gmail.com','$2a$10$5ZzKwjbp.i9w5U5cQVEfKOzTJ7ubLoSuSbNFzleYF8oKMQzLkFG5O','2025-01-16 20:56:04','2025-01-18 21:44:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

