<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CorsController
{
    #[Route('/api/{any}', requirements: ['any' => '.*'], methods: ['OPTIONS'])]
    public function options(): Response
    {
        return new Response('', 204);
    }
}
