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
  `served` INTEGER  0 or 1
);

CREATE TABLE `ServiceCounter` (
  `service` INTEGER,
  `counter` INTEGER
);

CREATE TABLE `serving` (
  `ticket` INTEGER,
  `counter` INTEGER
);

ALTER TABLE `ticket` ADD FOREIGN KEY (`service`) REFERENCES `service` (`id`);

ALTER TABLE `ServiceCounter` ADD FOREIGN KEY (`service`) REFERENCES `service` (`id`);

ALTER TABLE `ServiceCounter` ADD FOREIGN KEY (`counter`) REFERENCES `counter` (`id`);

ALTER TABLE `serving` ADD FOREIGN KEY (`ticket`) REFERENCES `ticket` (`id`);

ALTER TABLE `serving` ADD FOREIGN KEY (`counter`) REFERENCES `counter` (`id`);
