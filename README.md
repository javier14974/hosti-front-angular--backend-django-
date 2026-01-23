🏥 HOSTI - Plataforma de Conexión Médica
HOSTI es una plataforma web diseñada para conectar pacientes con doctores de forma directa y eficiente, optimizando la atención médica particular.

🌟 Propuesta de Valor
La aplicación permite que los pacientes publiquen consultas o temas de salud específicos, mientras que los doctores pueden aprovechar sus tiempos libres para brindar atención médica, generando ingresos extra y ofreciendo una alternativa de salud rápida y accesible.

🛠️ Tecnologías Utilizadas
Frontend: Angular (Interfaz dinámica y responsiva).

Backend: Django & Django REST Framework (API robusta y escalable).

Base de Datos: PostgreSQL / SQLite.

Autenticación: JSON Web Tokens (JWT) para sesiones seguras.

🔐 Seguridad y Arquitectura
El proyecto implementa estándares modernos de desarrollo backend para garantizar la privacidad de los datos:

Autenticación JWT: Implementación de arquitectura Stateless mediante el uso de Access Tokens y Refresh Tokens.

Protección de Endpoints: Validación manual de identidad en el servidor, asegurando que los usuarios solo puedan acceder, editar o eliminar su propia información (prevención de ataques IDOR).

Desacoplamiento total: Comunicación eficiente mediante una REST API, permitiendo la escalabilidad hacia aplicaciones móviles en el futuro.

🚀 Estado del proyecto
Actualmente en fase de desarrollo (Work in Progress). Implementando módulos de gestión de reservas y perfiles médicos.
