<?php

namespace App\EventSubscriber;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class DatabaseExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        if ($exception instanceof UniqueConstraintViolationException) {
            $errorMessage = $exception->getMessage();

            // Vérifier si c'est l'erreur d'email unique
            if (
                str_contains($errorMessage, 'UNIQ_IDENTIFIER_EMAIL') ||
                str_contains($errorMessage, 'users_email_key') ||
                str_contains($errorMessage, 'email')
            ) {

                $response = new JsonResponse([
                    'status' => 409,
                    'message' => 'Cette adresse email est déjà utilisée.',
                    'data' => [
                        'field' => 'email',
                        'error' => 'EMAIL_ALREADY_EXISTS'
                    ]
                ], Response::HTTP_CONFLICT);

                $event->setResponse($response);
            }
        }
    }
}
