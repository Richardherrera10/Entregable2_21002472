CREATE DATABASE tienda;

use tienda;

Create table empleado
(idEmpleado int not null primary key auto_increment,
nombreApellido varchar(45),
idUsuario varchar(25),
contrasena varchar(150)
);



select * from empleado;
Insert into empleado(nombreApellido, idUsuario, contrasena) values("Javier Villatoro", "vjavier.1", sha2("javier123", 224));
Insert into empleado(nombreApellido, idUsuario, contrasena) values("Francis Gómez", "fgomez.2", sha2("francis123",224));
insert into empleado(nombreAPellido, idUsuario, contrasena) values("Richard Parker", "prichard.3", sha2("richard123",224));

select * from empleado where contrasena = sha2("javier123",224);


Create table productos
(codProducto varchar(15) not null primary key,
nombreProducto varchar(25),
Descripcion varchar(200),
Categoria varchar(25),
existenciaInventario int,
grupoProv int
);



Insert into productos(codProducto, nombreProducto, Descripcion, Categoria, existenciaInventario, grupoProv) 
values("A1", "Gasesosa Tiki", "Agua Gaseosa Tiki de 1 litro en envase de plastico", "Gaseosas", 16, 1);

Insert into productos(codProducto, nombreProducto, Descripcion, Categoria, existenciaInventario, grupoProv) 
values("B3", "Pan Integral Bimbo", "Pan Integral Bimbo 12 Porciones", "Panes", 25, 2);

Insert into productos(codProducto, nombreProducto, Descripcion, Categoria, existenciaInventario, grupoProv) 
values("C45", "Alcohol en Gel", "Bote 5 oz alcohol en gel", "Higiene", 45, 3);

Insert into productos(codProducto, nombreProducto, Descripcion, Categoria, existenciaInventario, grupoProv) 
values("D13", "Shampoo  Pantene 15 ml", "Shampoo Anticaidas Pantene 15 ml", "Higiene", 23, 3);

Insert into productos(codProducto, nombreProducto, Descripcion, Categoria, existenciaInventario, grupoProv) 
values("E31", "Tortrix con Chicharron", "Bolsa de 15 unidades de tortrix con chicharron", "Comida Chatarra", 31, 2);

Insert into productos(codProducto, nombreProducto, Descripcion, Categoria, existenciaInventario, grupoProv) 
values("K2", "Jugo de Naranja", "Jugo de Naranja 'La Granja' Grande ", "Bebidas", 26, 2);


Create table proveedores
(codProvedor varchar(15) not null primary key,
nombre varchar(25),
circuloProv int
);


Insert into proveedores(codProvedor, nombre, circuloProv) values("P1", "Carlos Ortiz", 1);
Insert into proveedores(codProvedor, nombre, circuloProv) values("P2", "María Díaz", 1);
Insert into proveedores(codProvedor, nombre, circuloProv) values("P3", "Hosman Lopez", 1);
Insert into proveedores(codProvedor, nombre, circuloProv) values("P4", "Michelle Villatoro", 1);

Insert into proveedores(codProvedor, nombre, circuloProv) values("P5", "Ariana Grande", 2);
Insert into proveedores(codProvedor, nombre, circuloProv) values("P6", "Hayden Gonzalez", 2);
Insert into proveedores(codProvedor, nombre, circuloProv) values("P7", "Estefany Marroquín", 2);

Insert into proveedores(codProvedor, nombre, circuloProv) values("P8", "Alex Londres", 3);
Insert into proveedores(codProvedor, nombre, circuloProv) values("P9", "Auron Londra", 3);


SELECT * FROM productos;
SELECT prod.nombreProducto, prov.nombre FROM  productos AS prod, proveedores AS prov 
WHERE prod.grupoProv = prov.circuloProv AND prod.codProducto = "E31" ORDER BY prod.nombreProducto;

Create table pedidos(
idPedido int not null primary key auto_increment,
nombreProducto varchar(25),
codProducto varchar(15),
FOREIGN KEY (codProducto) REFERENCES productos(codProducto),
nombreProvedor varchar(25),
codProvedor varchar(15) not null,
FOREIGN KEY (codProvedor) REFERENCES proveedores(codProvedor),
cantidadPedir int,
fecha datetime);
