-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Maio-2021 às 05:12
-- Versão do servidor: 10.4.18-MariaDB
-- versão do PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `maisambiente`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamados`
--

CREATE TABLE `chamados` (
  `id` int(11) NOT NULL,
  `chamado_tipo` enum('Caça aos Animais','Maus-tratos de Animal','Incêndio','Poluição de Rios','Desmatamento') NOT NULL,
  `chamado_dono` tinyint(4) NOT NULL,
  `chamado_local` mediumtext NOT NULL,
  `chamado_data` date NOT NULL,
  `chamado_status` enum('Pendente','Em Atendimento','Finalizado','Inativo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `chamados`
--

INSERT INTO `chamados` (`id`, `chamado_tipo`, `chamado_dono`, `chamado_local`, `chamado_data`, `chamado_status`) VALUES
(8, 'Caça aos Animais', 11, 'Rua Derivan Araujo Castro', '2021-05-16', 'Pendente'),
(9, 'Maus-tratos de Animal', 11, 'Rua Derivan Araujo Castro', '2021-05-16', 'Pendente'),
(10, 'Incêndio', 11, 'Rua Derivan Araujo Castro', '2021-05-16', 'Pendente'),
(11, 'Desmatamento', 11, 'Rua Derivan Araujo Castro', '2021-05-16', 'Em Atendimento'),
(12, 'Poluição de Rios', 11, 'Rua Derivan Araujo Castro', '2021-05-01', 'Finalizado'),
(13, 'Caça aos Animais', 14, 'Rua Walderez Perez Xavier Giorgi, 153 - Parque Jandaia, Carapicuíba/SP', '2021-05-16', 'Inativo'),
(14, 'Incêndio', 14, 'Rua Walderez Perez Xavier Giorgi, 153 - Parque Jandaia, Carapicuíba/SP', '2021-05-17', 'Inativo'),
(15, 'Poluição de Rios', 14, 'Rua Walderez Perez Xavier Giorgi, 153 - Parque Jandaia, Carapicuíba/SP', '2021-05-17', 'Inativo'),
(16, 'Desmatamento', 14, 'Rua Walderez Perez Xavier Giorgi, 153 - Parque Jandaia, Carapicuíba/SP', '2021-05-17', 'Pendente');

-- --------------------------------------------------------

--
-- Estrutura da tabela `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `chat_usuario_id` int(11) NOT NULL,
  `chat_data` datetime NOT NULL,
  `chat_mensagem` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `chat`
--

INSERT INTO `chat` (`id`, `chat_usuario_id`, `chat_data`, `chat_mensagem`) VALUES
(4, 14, '2021-05-18 03:09:59', 'oi'),
(5, 14, '2021-05-18 03:10:22', 'Boa noite, eu tenho uma ocorrência para fazer!');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userlevel` enum('user','service','admin') NOT NULL,
  `user` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `userlevel`, `user`, `pwd`, `name`) VALUES
(11, 'admin', 'admin', '$2a$08$b5AlwMjttXEOQ9x6p7crH.lSm.U.YXpYBg9pjQJVxNd.V4PSRdDaO', 'Administrador'),
(13, 'user', 'cliente', '$2a$08$JupXABRj1LvVpkt/ok74LOYH4EYqQp/j10LFhvkZ.liszBjmMJiEO', 'Cliente Imaginário'),
(14, 'user', 'laurex', '$2a$08$R3wCPzbwuDDo.ibd0lpa2u8cf3V6w4GN4K63HDMsRVeHuwUwTIwKy', 'Laura Pereira'),
(15, 'user', 'luketa', '$2a$08$7Ij7L96t51tTbZsp71z9i.DzluMXCBj./aPKwNRQZY8F1gbkd4xU2', 'Lucas Fernandes');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `chamados`
--
ALTER TABLE `chamados`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `chamados`
--
ALTER TABLE `chamados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
