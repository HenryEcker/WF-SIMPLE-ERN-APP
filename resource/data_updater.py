import json
from time import sleep
from typing import List

import pymssql


def create_connection(
        host: str, user: str, password: str, database: str
) -> pymssql.Connection:
    """
    Create a new connection to the MS SQL database
    :param host: Resolvable Hostname
    :param user: Username with appropriate permissions
    :param password: Corresponding Password
    :param database: The name of the database to access
    :return: an open Connection object
    """
    return pymssql.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )


def write_json_to_file(data: List[dict], file_name: str, **kwargs) -> None:
    """
    Writes the list of dictionaries to a file as a JSON array

    :param data: The data to write to the file
    :param file_name: The name of the file to output
    :param kwargs: Keyword arguments that get passed to json.dumps
    """
    with open(file_name, 'w') as f:
        f.write(json.dumps(data, **kwargs))


def main(
        host: str,
        user: str,
        password: str,
        database: str,
        query: str,
        file_name: str,
        polling_rate: float
) -> None:
    """
    Create a connection to a MS SQL Server, execute a `query` every
    `polling_rate` seconds, and write the output to a file.
    :param host: Resolvable Hostname
    :param user: Username with appropriate permissions
    :param password: Corresponding Password
    :param database: The name of the database to access
    :param query: The query to run on that database
    :param file_name: The name of the file to output the results to
    :param polling_rate: How often (in seconds) to pull the data
    """
    # Create Connection
    conn = create_connection(host, user, password, database)
    # Give rows as dict (Helps with JSON Export)
    cursor = conn.cursor(as_dict=True)

    while True:
        # Run query on connection
        cursor.execute(query)
        # Output result as JSON array to file
        write_json_to_file(
            [row_dict for row_dict in cursor],
            file_name, indent=4
        )
        # Sleep for a bit
        sleep(polling_rate)


if __name__ == '__main__':
    rows_to_pull = 10
    # All specific information has been replaced with placeholders
    # This would need to be updated in order run correctly
    main(
        host='hostname',
        user='username',
        password='password',
        database='database',
        query=f'''SELECT TOP {rows_to_pull} * FROM TABLE_NAME;''',
        file_name='./data.json',
        polling_rate=40  # seconds
    )
