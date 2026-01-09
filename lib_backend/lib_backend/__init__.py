import pymysql

# 1. Activamos el puente PyMySQL
pymysql.install_as_MySQLdb()
pymysql.version_info = (2, 2, 1, 'final', 0)

# 2. Truco para saltar la protección "read-only" de Django
from django.db.backends.mysql.features import DatabaseFeatures

# Creamos una versión "parcheada" de las características
class PatchedFeatures(DatabaseFeatures):
    @property
    def can_return_rows_from_bulk_insert(self):
        return False
    
    @property
    def can_return_columns_from_insert(self):
        return False

# Aplicamos el parche globalmente
from django.db.backends.mysql.base import DatabaseWrapper
DatabaseWrapper.features_class = PatchedFeatures

# 3. Saltamos la validación de versión de MariaDB (el truco que ya conoces)
from django.db.backends.base.base import BaseDatabaseWrapper
BaseDatabaseWrapper.check_database_version_supported = lambda self: None