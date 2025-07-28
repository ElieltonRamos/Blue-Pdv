/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: SequelizeMeta
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_unicode_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: products
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `cost_price` decimal(10, 2) NOT NULL,
  `is_meat_bovine` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE = InnoDB AUTO_INCREMENT = 30 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  `profit_sale` decimal(10, 2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `user_operator` (`user_operator`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`user_operator`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: SequelizeMeta
# ------------------------------------------------------------

INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('01-create-users.js');
INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('02-create-clients.js');
INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('03-create-products.js');
INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('04-create-sales.js');
INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('05-create-sales-products.js');
INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('06-create-expenses.js');
INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('07-add-isMeatBovine-products.js');
INSERT INTO
  `SequelizeMeta` (`name`)
VALUES
  ('08-add-profitSale-sales.js');

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
    2,
    'João',
    'Rua dos bobos, n=0, centro',
    '38988776655',
    '12345678901'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (
    3,
    'Alicio',
    'kk eae men',
    '88888888888',
    '12345678989'
  );
INSERT INTO
  `clients` (`id`, `name`, `address`, `phone`, `cpf`)
VALUES
  (4, 'Eli', 'rua teste', '38988888888', '12345567899');

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

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: products
# ------------------------------------------------------------

INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (1, 'Paulista', '1', 36.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (2, 'Alcatra', '2', 39.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (3, 'Picanha', '3', 54.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (4, 'Capa do Filé', '4', 32.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (5, 'File', '5', 33.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (6, 'Contra File', '6', 39.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (7, 'Maminha', '7', 37.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (8, 'Coxao Mole', '8', 36.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (9, 'Coxao Duro', '9', 36.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (10, 'Carne Moida', '10', 24.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (11, 'Fraldinha', '11', 31.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (12, 'Acem Bovino', '12', 24.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (13, 'Miolo da Acem', '13', 29.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (14, 'Carne Peixinho Bovino', '14', 29.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (15, 'Carne Lombo Bovino', '15', 29.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (16, 'Paleta Bovina', '16', 31.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (17, 'Costela Bovina', '17', 14.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (18, 'Figado Bovino', '18', 21.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (19, 'Musculo', '19', 23.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (20, 'Linguica Caseira', '20', 24.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (21, 'Carne de Panela', '21', 24.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (22, 'Carne de Feijoada', '22', 23.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (23, 'Produto nao cadastrado', '23', 0.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (24, 'Osso de Patin', '24', 9.99, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (25, '156', '156', 15.00, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (26, 'teste', '157', 112.00, 20.00, 0);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (27, 'teste atualizacao ', '158', 1.00, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (28, 'tes', '160', 1.00, 17.00, 1);
INSERT INTO
  `products` (
    `id`,
    `name`,
    `code`,
    `price`,
    `cost_price`,
    `is_meat_bovine`
  )
VALUES
  (29, 'produto teste', '161', 15.89, 10.00, 0);

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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    1,
    2,
    1,
    'Cartão',
    '2025-04-30 21:00:00',
    106.56,
    106.56,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    2,
    1,
    2,
    'Dinheiro',
    '2025-05-01 21:00:00',
    53.50,
    53.50,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    3,
    1,
    1,
    'Cartão',
    '2025-07-25 09:32:11',
    232.94,
    232.94,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    4,
    1,
    1,
    'Dinheiro',
    '2025-07-26 09:00:39',
    36.99,
    36.99,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    5,
    3,
    1,
    'Notinha',
    '2025-07-26 09:01:32',
    54.99,
    54.99,
    0.00,
    0,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    6,
    2,
    1,
    'Notinha',
    '2025-07-26 09:02:20',
    24.99,
    24.99,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    7,
    1,
    1,
    'Dinheiro',
    '2025-07-27 19:02:20',
    36.99,
    36.99,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    8,
    1,
    1,
    'Cartão',
    '2025-07-27 19:03:38',
    39.99,
    39.99,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    9,
    1,
    1,
    'Dinheiro',
    '2025-07-27 19:05:21',
    36.99,
    13.00,
    23.99,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    10,
    1,
    1,
    'Dinheiro',
    '2025-07-27 19:10:30',
    86.22,
    86.22,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    11,
    1,
    1,
    'Pix',
    '2025-07-27 19:11:28',
    23.82,
    23.82,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    12,
    1,
    1,
    'Dinheiro',
    '2025-07-27 19:24:13',
    36.99,
    36.99,
    0.00,
    1,
    0.00
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
    `is_paid`,
    `profit_sale`
  )
VALUES
  (
    13,
    2,
    1,
    'Notinha',
    '2025-07-27 19:25:12',
    24.99,
    24.99,
    0.00,
    0,
    0.00
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales_products
# ------------------------------------------------------------

INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (1, 1, 1.568);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (1, 2, 2.687);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (2, 2, 2.549);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (3, 1, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (3, 2, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (3, 3, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (3, 4, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (3, 5, 2.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (4, 1, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (5, 3, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (6, 10, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (7, 1, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (8, 2, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (9, 1, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (10, 3, 1.568);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (11, 17, 1.589);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (12, 1, 1.000);
INSERT INTO
  `sales_products` (`sale_id`, `product_id`, `quantity`)
VALUES
  (13, 10, 1.000);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (`id`, `username`, `password`, `user_type`)
VALUES
  (
    1,
    'Elielton',
    '$2b$10$LBuORnlMEf0ywsvUOfELhu9ZYat2Kre1RJnJy8E2jDS6xuuHyu4dC',
    'Administrador'
  );
INSERT INTO
  `users` (`id`, `username`, `password`, `user_type`)
VALUES
  (
    2,
    'Lucas',
    '$2b$10$0ul4sdcGjXXNfVGT0Nk/oeejwhxTuwLw9BkHs3ZkQ7g4iqFlXsIp2',
    'Operador'
  );
INSERT INTO
  `users` (`id`, `username`, `password`, `user_type`)
VALUES
  (
    3,
    'Alicio',
    '$2b$10$UvUN0aXwDn6JCmBPGgTE/e1hYiHzQE1WaqHckXxiXMWoL5THmxV1.',
    'Administrador'
  );
INSERT INTO
  `users` (`id`, `username`, `password`, `user_type`)
VALUES
  (
    4,
    'Funcionario 1',
    '$2b$10$VSNb3gLXD0uIrZYgx5JgUO67s7BXmItO6eX4SnjfRGP1L3vUtLnOK',
    'Operador'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
