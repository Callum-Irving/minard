from .db import engine

def get_deck_activity(limit=25, offset=0):
    '''
    Return a dictionary of deck activity information
    '''
    conn = engine.connect()

    result = conn.execute("SELECT checkintime, checkouttime, checkinrun, "
                          "checkoutrun, firstname, lastname, reason, deck_lights, dcr_lights FROM logbook "
                          "ORDER BY checkintime DESC LIMIT %s OFFSET %s", \
                          (limit,offset))

    if result is None:
        return None

    keys = result.keys()
    rows = result.fetchall()

    return [dict(zip(keys, row)) for row in rows]

