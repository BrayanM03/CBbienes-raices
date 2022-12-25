-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-07-2022 a las 16:33:28
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aire_express`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `rfc` varchar(150) NOT NULL,
  `contacto` varchar(150) NOT NULL,
  `estatus` varchar(150) NOT NULL,
  `fecha_ingreso` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `telefono`, `rfc`, `contacto`, `estatus`, `fecha_ingreso`) VALUES
(23, 'Susan D. Greear', '443-270-7660', 'XAXX010101000', 'Sin definir', 'Activo', '2022-06-23'),
(24, 'Saudiel Grajales', '86984287', 'XAXX010101000', 'Sin definir', 'Activo', '2022-06-23'),
(25, 'Pedro Orivel Martinez', '8683747964', 'XAXX010101000', 'Brayan Maldonado', 'Activo', '2022-06-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE `cotizaciones` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `subtotal` decimal(11,2) NOT NULL,
  `total` decimal(11,2) NOT NULL,
  `iva` decimal(11,2) NOT NULL,
  `estatus` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `facturada` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_de_venta`
--

CREATE TABLE `detalles_de_venta` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(11,2) NOT NULL,
  `importe` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_clima`
--

CREATE TABLE `detalle_clima` (
  `id` int(11) NOT NULL,
  `serie_evaporador` varchar(150) NOT NULL,
  `serie_condensador` varchar(150) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_correo`
--

CREATE TABLE `detalle_correo` (
  `id` int(11) NOT NULL,
  `etiqueta` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `trash_flag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_correo`
--

INSERT INTO `detalle_correo` (`id`, `etiqueta`, `correo`, `id_usuario`, `trash_flag`) VALUES
(1, 'Ventas', 'natsu5679@gmail.com', 15, ''),
(2, 'ventas', 'natsu5679@gmail.com', 16, ''),
(3, 'ventas', 'natsu5679@gmail.com', 17, ''),
(4, 'ventas', 'natsu5679@gmail.com', 18, ''),
(5, 'ventas', 'natsu5679@gmail.com', 19, ''),
(6, 'ventas', 'natsu5679@gmail.com', 20, ''),
(7, 'ventas', 'natsu5679@gmail.com', 21, ''),
(8, 'Sin etiqueta', 'natsu5679@gmail.com', 22, ''),
(9, 'Personal', 'pedro.orivel@gmail.com', 25, ''),
(10, 'Contacto', 'natsu5679@gmail.com', 25, ''),
(11, 'Vendedor', 'natsu5679@gmail.com', 25, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_cotizacion`
--

CREATE TABLE `detalle_cotizacion` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(12,2) NOT NULL,
  `importe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_cuenta_bancaria`
--

CREATE TABLE `detalle_cuenta_bancaria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `cuenta` varchar(150) NOT NULL,
  `banco` varchar(150) NOT NULL,
  `rfc_banco` varchar(150) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `trash_flag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_cuenta_bancaria`
--

INSERT INTO `detalle_cuenta_bancaria` (`id`, `nombre`, `cuenta`, `banco`, `rfc_banco`, `id_usuario`, `trash_flag`) VALUES
(3, 'Pedro Orivel Martinez', '484848484848', 'AFIRME', 'BAF950102JP5', 25, ''),
(4, 'Susana Orivel Martinez', '98697251000889', 'AFIRME', 'BAF950102JP5', 25, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_direccion`
--

CREATE TABLE `detalle_direccion` (
  `id` int(11) NOT NULL,
  `calle` varchar(250) NOT NULL,
  `colonia` varchar(250) NOT NULL,
  `numero_int` int(11) NOT NULL,
  `numero_ext` int(11) NOT NULL,
  `cp` varchar(50) NOT NULL,
  `ciudad` varchar(150) NOT NULL,
  `municipio` varchar(150) NOT NULL,
  `estado` varchar(150) NOT NULL,
  `pais` varchar(150) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `trash_flag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_direccion`
--

INSERT INTO `detalle_direccion` (`id`, `calle`, `colonia`, `numero_int`, `numero_ext`, `cp`, `ciudad`, `municipio`, `estado`, `pais`, `id_usuario`, `trash_flag`) VALUES
(12, 'Five Points', 'Baltimo 66', 10, 1808, '87350', 'Matamoros', 'Matamoros', 'TAM', 'MEX', 23, 'No borrar'),
(13, 'Diesciseis', 'Buena Vista', 0, 582, '87350', 'Matamoros', 'Matamoros', 'TAM', 'MEX', 24, ''),
(14, 'Gildernasf', 'Las Flores', 0, 987, '88500', 'Matamoros', 'Matamoros', 'TAM', 'MEX', 25, ''),
(15, 'Malvidas', 'Americas', 0, 132, '88500', 'Matamoros', 'Matamoros', 'TAM', 'MEX', 25, ''),
(16, 'Esperanza y Reforma', 'La Luz', 0, 25, '88500', 'Matamoros', 'Matamoros', 'TAM', 'MEX', 25, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id` int(11) NOT NULL,
  `proveedor` varchar(150) NOT NULL,
  `tonelaje` varchar(150) NOT NULL,
  `marca` varchar(150) NOT NULL,
  `modelo` varchar(150) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `estatus` varchar(80) NOT NULL,
  `sucursal` int(11) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id`, `proveedor`, `tonelaje`, `marca`, `modelo`, `costo`, `precio`, `stock`, `estatus`, `sucursal`, `categoria`) VALUES
(4, 'Climas Patito 99', '1 TON 110V', 'Mirage dd', 'Magnum 22', '6900.00', '8600.00', 3, 'activo', 1, 'Producto'),
(5, 'La helada', '2 TON 220V', 'Mirage', 'Magnum 19', '6900.00', '8600.00', 2, 'activo', 1, 'Producto'),
(6, 'SEPULVEDA ', '1.5 TON 220V', 'Mirage', 'Magnum 12', '6900.00', '8600.00', 2, 'activo', 2, 'Producto'),
(10, 'Climas Rodriguez', '1 TON 110V', 'Samsung', 'MIK909', '3631.00', '9500.00', 3, 'activo', 2, 'Producto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refacciones`
--

CREATE TABLE `refacciones` (
  `id` int(11) NOT NULL,
  `proveedor` varchar(150) NOT NULL,
  `descripcion` varchar(350) NOT NULL,
  `stock` int(11) NOT NULL,
  `modelo` varchar(150) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `estatus` varchar(100) NOT NULL,
  `observaciones` varchar(350) NOT NULL,
  `sucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `series`
--

CREATE TABLE `series` (
  `id` int(11) NOT NULL,
  `fecha_compra` varchar(100) NOT NULL,
  `serie_condensador` varchar(100) NOT NULL,
  `serie_evaporizador` varchar(150) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `series`
--

INSERT INTO `series` (`id`, `fecha_compra`, `serie_condensador`, `serie_evaporizador`, `producto_id`, `tipo`) VALUES
(5, '2022-06-30', '4F739B7233', '4F739B7231', 4, 'Aire acondicionado'),
(6, '2022-06-30', '4F739B7987', '4F739B695', 4, 'Aire acondicionado'),
(7, '2022-06-30', '4F739B7365', '4F739B1458', 4, 'Aire acondicionado'),
(8, '2022-06-30', 'CLC181D7112103174', 'ELC181D7112102889', 5, 'Aire acondicionado'),
(9, '2022-06-30', 'CLC121D7112110229', 'ELC121D7012205325', 5, 'Aire acondicionado'),
(46, '2022-07-02', 'CLC181D7112103174', 'ELC181D7112102889', 6, 'Aire acondicionado'),
(48, '2022-06-21', 'CLC181D7112109825', 'ELC181D7112109825', 6, 'Aire acondicionado'),
(62, '2022-07-02', 'MIU89962', 'MIP89962', 10, 'Aire acondicionado'),
(63, '2022-07-02', 'MIU89859', 'MIP89962', 10, 'Aire acondicionado'),
(64, '2022-07-02', 'MIU87125', 'MIP89962', 10, 'Aire acondicionado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `RFC` varchar(100) NOT NULL,
  `representante` varchar(100) NOT NULL,
  `fecha_de_ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`id`, `nombre`, `telefono`, `direccion`, `correo`, `RFC`, `representante`, `fecha_de_ingreso`) VALUES
(1, 'AireExpress', 'NA', 'NA', 'NA', 'NA', 'NA', '0000-00-00'),
(2, 'ServiClima', 'NA', 'NA', 'NA', 'NA', 'NA', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `estatus` varchar(100) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `rol`, `estatus`, `fecha_ingreso`, `usuario`, `contraseña`) VALUES
(4, 'Brayan', 'Maldonado', 'manager', 'Activo', '2022-06-16', 'bray1', '$2y$10$AlJdAfhKSkxjmFUb7NB8a.xWHY6AXefyUWqyKki3TtCuivzGPWVF.'),
(5, 'Alvaro', 'Maldonado', 'sales', 'Activo', '2022-06-16', 'alva1', '$2y$10$pzENaxGoQr2iwy9VEWoUSu0ejU0jz7M888g7u.DKZc1PKV2tevO2O');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `subtotal` decimal(11,2) NOT NULL,
  `total` decimal(11,2) NOT NULL,
  `iva` decimal(11,2) NOT NULL,
  `fecha` date NOT NULL,
  `estatus` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `facturada` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `detalles_de_venta`
--
ALTER TABLE `detalles_de_venta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `detalle_clima`
--
ALTER TABLE `detalle_clima`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_correo`
--
ALTER TABLE `detalle_correo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_cotizacion`
--
ALTER TABLE `detalle_cotizacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `detalle_cuenta_bancaria`
--
ALTER TABLE `detalle_cuenta_bancaria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_direccion`
--
ALTER TABLE `detalle_direccion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `refacciones`
--
ALTER TABLE `refacciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cliente_id` (`cliente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_de_venta`
--
ALTER TABLE `detalles_de_venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_clima`
--
ALTER TABLE `detalle_clima`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_correo`
--
ALTER TABLE `detalle_correo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `detalle_cotizacion`
--
ALTER TABLE `detalle_cotizacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_cuenta_bancaria`
--
ALTER TABLE `detalle_cuenta_bancaria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detalle_direccion`
--
ALTER TABLE `detalle_direccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `refacciones`
--
ALTER TABLE `refacciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `series`
--
ALTER TABLE `series`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
