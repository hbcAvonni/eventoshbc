<?php
require_once('../model/constantes.php');
require_once('../vendor/autoload.php');

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$carrito = $data['carrito'] ?? [];

if (empty($carrito)) {
    echo json_encode(['error' => 'Carrito vacío']);
    exit;
}

\Stripe\Stripe::setApiKey(STRIPE_SECRETS_KEY);

$YOUR_DOMAIN = REDIRECT_ROUTE . "pagos";

$line_items = [];

foreach ($carrito as $producto) {
    $line_items[] = [
        'price_data' => [
            'currency' => 'eur',
            'product_data' => [
                'name' => $producto['nombre'],
                'description' => $producto['detalles'], // Si quieres, puedes incluir descripción
            ],
            'unit_amount' => intval($producto['precio'] * 100), // Recuerda: Stripe usa centavos
        ],
        'quantity' => $producto['cantidad'],
    ];
}

$checkout_session = \Stripe\Checkout\Session::create([
    'payment_method_types' => [],
    'line_items' => $line_items,
    'mode' => 'payment',
    'success_url' => $YOUR_DOMAIN . '/success.html',
    'cancel_url' => $YOUR_DOMAIN . '/cancel.html',
]);

echo json_encode([
  'url' => $checkout_session->url ?? null,
  'error' => $checkout_session->url ? null : 'No se pudo crear la sesión'
]);

/*
require_once('../model/constantes.php');
require_once('../vendor/autoload.php');

\Stripe\Stripe::setApiKey(STRIPE_SECRETS_KEY);
header('Content-Type: application/json');

$YOUR_DOMAIN = REDIRECT_ROUTE . "pagos";

$checkout_session = \Stripe\Checkout\Session::create([
  'line_items' => [[
    # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
    'price' => 'price_1QpCfZ1ijOl6KJDEaAKLGShq',
    'quantity' => 1,
  ]],
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '/success.html',
  'cancel_url' => $YOUR_DOMAIN . '/cancel.html',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);
---------------
require_once('../model/constantes.php');
require_once('../vendor/autoload.php');

\Stripe\Stripe::setApiKey(STRIPE_SECRETS_KEY);
header('Content-Type: application/json');

$YOUR_DOMAIN = REDIRECT_ROUTE . "pagos";

// Supongamos que tienes un array de productos que puedes obtener dinámicamente
$productos = [
  [
    'nombre' => 'Producto 1',
    'descripcion' => 'Descripción del producto 1',
    'precio' => 1500, // 15 euros
    'cantidad' => 2
  ],
  [
    'nombre' => 'Producto 2',
    'descripcion' => 'Descripción del producto 2',
    'precio' => 2000, // 20 euros
    'cantidad' => 1
  ],
  [
    'nombre' => 'Producto 3',
    'descripcion' => 'Descripción del producto 3',
    'precio' => 750, // 7.50 euros
    'cantidad' => 3
  ]
];

$line_items = [];

foreach ($productos as $producto) {
  $line_items[] = [
    'price_data' => [
      'currency' => 'eur',
      'product_data' => [
        'name' => $producto['nombre'],
        'description' => $producto['descripcion'],
      ],
      'unit_amount' => $producto['precio'],
    ],
    'quantity' => $producto['cantidad'],
  ];
}

$checkout_session = \Stripe\Checkout\Session::create([
  'payment_method_types' => ['card'],
  'line_items' => $line_items,
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '/success.html',
  'cancel_url' => $YOUR_DOMAIN . '/cancel.html',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);
*/