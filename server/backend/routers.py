class ProductionRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'series': 
            #return 'default_production'
            return 'db_series'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'series':
            #return 'default_production'
            return 'db_series'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if (
            obj1._meta.app_label == 'series' or
            obj2._meta.app_label == 'series'
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        #if db == 'default_production':
        if db =='db_series': return app_label == 'series'
        elif app_label == 'series':
            return False
        return None
