CREATE TABLE `service` (
  `id` INTEGER,
  `type` text,
  `time` INTEGER
);

CREATE TABLE `counter` (
  `id` INTEGER
);

CREATE TABLE `ticket` (
  `id` INTEGER,
  `service` INTEGER,
  `eta` INTEGER,
  `served` INTEGER,
  FOREIGN KEY (`service`) REFERENCES `service` (`id`)
);

CREATE TABLE `ServiceCounter` (
  `service` INTEGER,
  `counter` INTEGER,
  FOREIGN KEY (`service`) REFERENCES `service` (`id`),
  FOREIGN KEY (`counter`) REFERENCES `counter` (`id`)
);

CREATE TABLE `serving` (
  `ticket` INTEGER,
  `counter` INTEGER,
  FOREIGN KEY (`ticket`) REFERENCES `ticket` (`id`),
  FOREIGN KEY (`counter`) REFERENCES `counter` (`id`)
);
