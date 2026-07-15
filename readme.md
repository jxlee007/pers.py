# django structure 

```
myproject/                  <- Root project directory
├── manage.py               <- Project management script
└── myproject/              <- Project configuration package
    ├── __init__.py
    ├── asgi.py             <- ASGI server configuration
    ├── settings.py         <- Project settings and configuration
    ├── urls.py             <- Root URL declarations
    └── wsgi.py             <- WSGI server configuration
├── myapp/                  <- Your Django App directory
    ├── migrations/         <- Database migration files
    │   └── __init__.py
    ├── __init__.py
    ├── admin.py            <- Admin panel configurations
    ├── apps.py             <- App configuration settings
    ├── models.py           <- Database models (Data layer)
    ├── tests.py            <- Test cases for the app
    └── views.py            <- Request/Response logic (Logic layer)
```

- intial django setup with html and css - [link](/notes/outcome/090726.txt)