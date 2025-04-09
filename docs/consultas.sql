-- En este archivo deben estar tus ejercicios de consultas sql

-- 1

SELECT nombres FROM empleados  
ORDER BY nombres DESC;

-- 2

SELECT empleados.nombres, puestos.puesto, localidades.localidad
FROM empleados
JOIN puestos ON empleados.puesto_id = puestos.id
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE puestos.puesto = 'Soporte';

-- 3

SELECT nombres
FROM empleados
WHERE nombres LIKE '%o';

-- 4

SELECT empleados.nombres, empleados.sueldo, localidades.localidad
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE localidades.localidad = 'Carlos Paz';

--5

SELECT empleados.nombres, empleados.sueldo, localidades.localidad
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE empleados.sueldo BETWEEN 10000 AND 13000;

--6

SELECT departamentos.denominacion, COUNT(empleados.id) AS cantidad_empleados
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
GROUP BY departamentos.id
HAVING COUNT(empleados.id) > 5;

--7

SELECT empleados.nombres
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
JOIN puestos ON empleados.puesto_id = puestos.id
WHERE localidades.localidad = 'Córdoba'
AND (puestos.puesto = 'Analista' OR puestos.puesto = 'Programador');

--8

SELECT AVG(sueldo) AS sueldo_medio
FROM empleados;

--9

SELECT MAX(sueldo) AS sueldo_maximo
FROM empleados
WHERE departamento_id = 10;

--10

SELECT MIN(empleados.sueldo) AS sueldo_minimo
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
WHERE departamentos.denominacion = 'Soporte';

--11

SELECT puestos.puesto, SUM(empleados.sueldo) AS suma_sueldos
FROM empleados
JOIN puestos ON empleados.puesto_id = puestos.id
GROUP BY puestos.puesto;





