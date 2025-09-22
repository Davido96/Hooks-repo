from django.core.cache import cache


def invalidate_cache(cache_key,pages=None):
    if not pages:
        if isinstance(cache_key,str):
            cache.delete(cache_key)
        elif isinstance(cache_key,list):
            for key in cache_key:
                cache.delete(key)
