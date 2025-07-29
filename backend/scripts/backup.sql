/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: clients
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 37 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: expenses
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `value` decimal(10, 2) NOT NULL,
  `date_payment` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: products
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `cost_price` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE = InnoDB AUTO_INCREMENT = 52 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sales
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int unsigned NOT NULL,
  `user_operator` int unsigned NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `total_products_without_discount` decimal(10, 2) NOT NULL,
  `total` decimal(10, 2) NOT NULL,
  `discount` decimal(10, 2) DEFAULT '0.00',
  `is_paid` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `user_operator` (`user_operator`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`user_operator`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 47 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sales_products
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sales_products` (
  `sale_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `quantity` decimal(10, 3) NOT NULL,
  PRIMARY KEY (`sale_id`, `product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sales_products_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sales_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sequelizemeta
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: clients
# ------------------------------------------------------------

INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    1,
    'Avista',
    'Clientes Avista',
    '00000000000',
    '00000000000'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    3,
    'osvaldo',
    'barreiro dantas',
    '38991142200',
    '04565287987'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    4,
    'li filha jorje ',
    'santos domont',
    '38991123010',
    '23528597891'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    5,
    'naiara ',
    'barreiro dantas',
    '38998747266',
    '14256659666'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    6,
    'joaquim da sinuca',
    'jardim orinte',
    '38991141118',
    '21578879665'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    7,
    'milton nucleo',
    'nucleo 3',
    '38998733453',
    '11765866585'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    8,
    'luzia mae',
    'jardim oriente',
    '38991146550',
    '11731151616'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    9,
    'alex santana ',
    'santana',
    '38984180035',
    '16588878889'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    10,
    'luis neto',
    'santana',
    '38992137954',
    '14765886999'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    11,
    'te moacir ',
    'barreiro',
    '38991396122',
    '12359796989'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    12,
    'tiao barreiro dantas ',
    'barreiro dantas',
    '11995619114',
    '05456888888'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    13,
    'claudio vitor ',
    'barreiro',
    '38991894002',
    '05565665666'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    14,
    'geralda ',
    'barreiro',
    '38991263303',
    '02145878788'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    15,
    'ze guila',
    'barreiro dantas',
    '38991684105',
    '05166999998'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    16,
    'lorim ',
    'barreiro dantas',
    '38999024366',
    '03102656699'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    17,
    'kaikai ',
    'riacho dagua',
    '38992308979',
    '45669989997'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    18,
    'tone peca ',
    'sao cristovao',
    '38991481303',
    '05059849899'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    19,
    'geraldo primo ',
    'pernanbuco',
    '38991265603',
    '05499799979'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    20,
    'aurelio ',
    'paus pretos',
    '38991606695',
    '02488988795'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    21,
    'kuei santos ',
    'barreiro',
    '38991062475',
    '05465995969'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    22,
    'valdeir dantas',
    'bela vista',
    '38991143034',
    '26649985984'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    23,
    'junior',
    'santos mont',
    '38991240471',
    '05454744988'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    24,
    'paulinho trator',
    'susuarana',
    '38991280506',
    '05153486211'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    25,
    'piau pintor ',
    'santa claudia',
    '38991685143',
    '16866060605'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    26,
    'izaqui pedreiro',
    'bela vista',
    '38997298520',
    '54356775566'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    27,
    'tim moacir',
    'joao paulo ',
    '38992027698',
    '54232223334'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    28,
    'daniela',
    'cidade nova',
    '38992202594',
    '54234543434'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    29,
    'alicio ferreira da silva',
    'barreiro dantas',
    '38991146550',
    '11731151616'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    30,
    'OSVALDO',
    'barreiro dantas',
    '38991142200',
    '38588988789'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    31,
    'PAULA MOACIR ',
    'BARREIO',
    '38995454555',
    '21458775658'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    32,
    'GENILSON',
    'barreiro dantas',
    '38991946980',
    '03155877796'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    33,
    'CIDAO',
    'paus preto',
    '38991146550',
    '03157935425'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    34,
    'JOSE FERREIRA DA SILVA',
    'barreiro dantas',
    '38991485581',
    '03405999888'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    35,
    'RONALD BODAO',
    'SANTOS MONT',
    '38991198890',
    '04157487758'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    36,
    'silvano ',
    'riacho Dagua',
    '38991964347',
    '05415999779'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: expenses
# ------------------------------------------------------------

INSERT INTO
  `expenses` (
    `id`,
    `description`,
    `supplier`,
    `status`,
    `value`,
    `date_payment`
  )
VALUES
  (
    1,
    'Compra do Sistema PDV',
    'BluePDV',
    'Pago',
    100.00,
    '2025-06-30 21:00:00'
  );
INSERT INTO
  `expenses` (
    `id`,
    `description`,
    `supplier`,
    `status`,
    `value`,
    `date_payment`
  )
VALUES
  (
    2,
    'boi gordo',
    'gilson',
    'Pendente',
    3609.00,
    '2025-08-11 21:00:00'
  );
INSERT INTO
  `expenses` (
    `id`,
    `description`,
    `supplier`,
    `status`,
    `value`,
    `date_payment`
  )
VALUES
  (
    3,
    'boi gordo',
    'sebartiao',
    'Pendente',
    6100.00,
    '2025-08-02 21:00:00'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: products
# ------------------------------------------------------------

INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (26, 'paulista ', '1', 36.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (27, 'Alcatra', '2', 39.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (28, 'picanha ', '3', 54.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (29, 'CAPA DO FILE', '4', 32.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (30, 'FILE MINGON', '5', 34.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (31, 'CONTRA FILE ', '6', 39.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (32, 'MAMINHA', '7', 37.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (33, 'COXAO MOLE', '8', 36.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (34, 'COXAO DURO', '9', 36.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (35, 'CARNE MOIDA', '10', 24.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (36, 'FLALDINHA', '11', 31.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (37, 'ACEM', '12', 24.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (38, 'MIOLO DO ACEM', '13', 29.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (39, 'PEXINHO', '14', 29.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (40, 'LOMBO BOVINO', '15', 29.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (41, 'PALETA', '16', 31.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (42, 'COSTELA', '17', 14.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (43, 'FIGADO ', '18', 21.99, 15.00);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (44, 'MUSCULO', '19', 23.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (45, 'LINGUICA CASEIRA', '20', 24.99, 18.99);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (46, 'CARNE DE PANELA', '21', 24.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (47, 'CARNE FEIJOADA', '22', 23.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (48, 'PESCOCO ', '23', 14.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (49, 'OSSO PATIM', '24', 9.99, 4.99);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (50, 'maca do peito', '25', 31.99, 22.53);
INSERT INTO
  `products` (`id`, `name`, `code`, `price`, `cost_price`)
VALUES
  (51, 'rapadura amendoin', '26', 17.99, 12.99);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales
# ------------------------------------------------------------

INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    5,
    1,
    3,
    'Pix',
    '2025-07-25 16:30:57',
    127.96,
    127.96,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    6,
    3,
    3,
    'Notinha',
    '2025-07-25 17:10:45',
    127.96,
    127.96,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    7,
    28,
    3,
    'Notinha',
    '2025-07-25 17:44:30',
    109.77,
    109.77,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    8,
    1,
    3,
    'Dinheiro',
    '2025-07-26 06:41:27',
    29.99,
    29.99,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    9,
    12,
    3,
    'Notinha',
    '2025-07-28 10:52:50',
    61.78,
    61.78,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    10,
    18,
    3,
    'Notinha',
    '2025-07-28 10:55:26',
    81.92,
    81.92,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    11,
    20,
    3,
    'Notinha',
    '2025-07-28 10:58:33',
    146.00,
    146.00,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    12,
    21,
    3,
    'Notinha',
    '2025-07-28 11:01:02',
    137.70,
    137.70,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    13,
    22,
    3,
    'Notinha',
    '2025-07-28 11:02:41',
    129.00,
    129.00,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    14,
    13,
    3,
    'Notinha',
    '2025-07-28 11:04:44',
    88.70,
    88.70,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    15,
    11,
    3,
    'Notinha',
    '2025-07-28 11:06:18',
    128.00,
    128.00,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    16,
    14,
    3,
    'Notinha',
    '2025-07-28 11:07:47',
    176.58,
    176.58,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    17,
    15,
    3,
    'Notinha',
    '2025-07-28 11:09:32',
    155.99,
    155.99,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    18,
    23,
    3,
    'Notinha',
    '2025-07-28 11:11:37',
    107.99,
    107.99,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    19,
    7,
    3,
    'Notinha',
    '2025-07-28 11:13:59',
    67.55,
    67.55,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    20,
    6,
    3,
    'Notinha',
    '2025-07-28 11:15:10',
    50.99,
    50.99,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    21,
    8,
    3,
    'Notinha',
    '2025-07-28 11:18:21',
    37.99,
    37.99,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    22,
    4,
    3,
    'Notinha',
    '2025-07-28 11:20:33',
    106.99,
    106.99,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    23,
    16,
    3,
    'Notinha',
    '2025-07-28 11:24:12',
    92.76,
    92.76,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    24,
    10,
    3,
    'Notinha',
    '2025-07-28 11:26:40',
    518.99,
    518.99,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    25,
    27,
    3,
    'Notinha',
    '2025-07-28 11:28:47',
    172.50,
    172.50,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    26,
    26,
    3,
    'Notinha',
    '2025-07-28 11:29:45',
    179.80,
    179.80,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    27,
    25,
    3,
    'Notinha',
    '2025-07-28 11:31:04',
    176.50,
    176.50,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    28,
    19,
    3,
    'Notinha',
    '2025-07-28 11:32:46',
    152.85,
    152.85,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    29,
    29,
    3,
    'Notinha',
    '2025-07-28 13:05:07',
    109.98,
    109.98,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    30,
    5,
    3,
    'Notinha',
    '2025-07-28 13:21:57',
    95.79,
    95.79,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    31,
    35,
    3,
    'Notinha',
    '2025-07-28 13:39:38',
    51.52,
    51.52,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    32,
    1,
    3,
    'Dinheiro',
    '2025-07-28 13:42:11',
    131.99,
    131.99,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    33,
    33,
    3,
    'Notinha',
    '2025-07-28 13:43:27',
    122.82,
    122.82,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    34,
    32,
    3,
    'Notinha',
    '2025-07-28 13:44:40',
    51.52,
    51.52,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    35,
    31,
    3,
    'Notinha',
    '2025-07-28 13:46:13',
    97.24,
    97.24,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    36,
    35,
    3,
    'Notinha',
    '2025-07-28 13:53:17',
    34.48,
    34.48,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    37,
    30,
    3,
    'Notinha',
    '2025-07-28 13:54:41',
    126.99,
    126.99,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    38,
    31,
    3,
    'Notinha',
    '2025-07-28 13:55:43',
    97.14,
    97.14,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    39,
    11,
    3,
    'Notinha',
    '2025-07-28 15:07:37',
    329.89,
    329.89,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    40,
    1,
    3,
    'Dinheiro',
    '2025-07-29 09:48:58',
    51.35,
    51.35,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    41,
    1,
    3,
    'Dinheiro',
    '2025-07-29 09:58:50',
    21.99,
    21.99,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    42,
    1,
    3,
    'Dinheiro',
    '2025-07-29 10:13:22',
    36.99,
    36.99,
    0.00,
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    43,
    8,
    3,
    'Notinha',
    '2025-07-29 10:22:06',
    39.58,
    39.58,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    44,
    36,
    3,
    'Notinha',
    '2025-07-29 10:58:04',
    71.38,
    71.38,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    45,
    36,
    3,
    'Notinha',
    '2025-07-29 10:59:44',
    17.99,
    17.99,
    0.00,
    0
  );
INSERT INTO
  `sales` (
    `id`,
    `client_id`,
    `user_operator`,
    `payment_method`,
    `date`,
    `total_products_without_discount`,
    `total`,
    `discount`,
    `is_paid`
  )
VALUES
  (
    46,
    1,
    3,
    'Dinheiro',
    '2025-07-29 11:10:29',
    49.98,
    49.98,
    0.00,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales_products
# ------------------------------------------------------------

INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (29, 28, 2.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (30, 31, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (31, 50, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (32, 50, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (33, 30, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (34, 50, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (35, 50, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (36, 32, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (37, 50, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (38, 33, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (39, 38, 11.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (40, 46, 2.055);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (41, 43, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (42, 33, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (43, 26, 1.070);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (44, 39, 2.380);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (45, 51, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (46, 46, 2.000);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sequelizemeta
# ------------------------------------------------------------

INSERT INTO
  `sequelizemeta` (`name`)
VALUES
  ('01-create-users.js');
INSERT INTO
  `sequelizemeta` (`name`)
VALUES
  ('02-create-clients.js');
INSERT INTO
  `sequelizemeta` (`name`)
VALUES
  ('03-create-products.js');
INSERT INTO
  `sequelizemeta` (`name`)
VALUES
  ('04-create-sales.js');
INSERT INTO
  `sequelizemeta` (`name`)
VALUES
  ('05-create-sales-products.js');
INSERT INTO
  `sequelizemeta` (`name`)
VALUES
  ('06-create-expenses.js');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (`id`, `username`, `password`, `user_type`)
VALUES
  (
    3,
    'Alicio',
    '$2b$10$iMzXX9rJUSn73PyK2XjxE.lUHoCw2OCx8XAXH5D/5TZdcPIKQGVYm',
    'Administrador'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;