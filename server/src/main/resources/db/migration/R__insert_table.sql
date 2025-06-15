CREATE TABLE category {
	category_id INT AUTO_INCREMENT PRIMARY KEY,
	category_title VARCHAR(255),
	slug VARCHAR(255),
	image_url VARCHAR(255),
	is_deleted BOOLEAN,
	created_at DATETIME(6),
	updated_at DATETIME(6)	
}

CREATE TABLE product {
	
}


CREATE TABLE user {
	
}

CREATE TABLE carts {
	
}

CREATE TABLE cart_items {
	
}

CREATE TABLE orders {
	
}

CREATE TABLE order_item {
	
}

CREATE TABLE inventory {
	
}