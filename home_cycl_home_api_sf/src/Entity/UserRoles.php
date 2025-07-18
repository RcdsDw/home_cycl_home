<?php

namespace App\Entity;

enum UserRoles: string
{
    case ROLE_ADMIN = 'ROLE_ADMIN';
    case ROLE_TECH = 'ROLE_TECH';
    case ROLE_USER = 'ROLE_USER';
}
