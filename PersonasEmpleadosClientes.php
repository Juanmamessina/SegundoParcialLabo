<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);
$file = 'datos.json';

if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$personas = json_decode(file_get_contents($file), true);

switch ($method) {
    case 'GET':
        echo json_encode($personas);
        break;

    case 'POST':
        $nuevaPersona = $data;
        $nuevaPersona['id'] = uniqid();
        $personas[] = $nuevaPersona;
        file_put_contents($file, json_encode($personas));
        echo json_encode($nuevaPersona);
        break;

    case 'PUT':
        $personaModificada = $data;
        $id = (int) $personaModificada['id'];
        foreach ($personas as &$persona) {
            if ((int) $persona['id'] === $id) { 
                $persona = $personaModificada;
                break;
            }
        }
        file_put_contents($file, json_encode($personas));
        echo json_encode($personaModificada);
        break;

    case 'DELETE':
        $id = $data['id'];
        $personas = array_filter($personas, function($persona) use ($id) {
            return $persona['id'] !== $id;
        });
        file_put_contents($file, json_encode($personas));
        echo json_encode(['id' => $id]);
        break;

    default:
        echo json_encode(['error' => 'Método no soportado']);
        break;
}

