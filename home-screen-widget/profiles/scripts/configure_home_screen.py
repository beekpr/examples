import requests
import argparse

CONFIG_URL = '{tenantUrl}/api/2/home-screen/configuration'
WIDGETS_URL = '{tenantUrl}/api/2/home-screen/configuration/widgets'
WIDGET_URL = '{tenantUrl}/api/2/home-screen/configuration/widgets/{widgetId}'
WIDGET_TYPES_URL = '{tenantUrl}/api/2/home-screen/widget-types'

ROLES = {'tenant': {'member': 'tenant.member'},
         'group': {'member': 'group_member', 'admin': 'group_admin'},
         'org_unit': {'member': 'org_unit.member', 'admin': 'org_unit.admin'}}


def start(tenant_url, auth_token, widget_type, widget_url, widget_id, groups, locations, tenants, op):
    params = {
        'tenantUrl': tenant_url,
        'authToken': auth_token,
        'widgetType': widget_type,
        'widgetUrl': widget_url,
        'widgetId': widget_id,
        'queryParams': {'visibility': 'manage'},
    }

    if op == 'delete_widget':
        if widget_id is None:
            print('Please specify --widgetId argument it is required for delete operation')
            return
        delete_widget(params)
    elif op == 'add_widget':
        if widget_type is None:
            print('Please specify --widgetType argument for creation and modification')
            return
        widget = create_widget(params)
        grant_access(params, widget, tenants, groups, locations)
    elif op == 'show_config':
        print_configuration(params)
    elif op == 'update_widget':
        if widget_id is None:
            print('Please specify --widgetId argument required for the update operation')
            return
        if groups is None and locations is None and tenants is None:
            print('Please specify at least one of the following --tenantAccess, --groupAccess, --locationAccess')
            return
        widget = get_widget(params)
        grant_access(params, widget, tenants, groups, locations)
    elif op == 'add_widget_type':
        if widget_type is None:
            print('Please specify --widgetType argument for creation and modification')
            return
        if widget_url is None:
            print('Please specify --widgetUrl argument for creation and modification')
            return
        widget = create_widget_type(params)
    else:
        print('Operation must be one of the following: show_config, add_widget, delete_widget, update_widget, add_widget_type')


def print_configuration(params):
    configuration = fetch_configuration(params)

    print('All widgets for this tenant:')

    for widget in configuration.get('widgets', []):
        print('WidgetType: {typeName} \nId: {id}'.format(**widget))
        acl = requests.get(
            '{tenantUrl}{aclPath}'.format(aclPath=widget.get('_relations', {}).get('acl', {}).get('href'), **params),
            headers={
                'Content-Type': 'application/json',
                'Authorization': 'Token {authToken}'.format(**params),
            },
        ).json()
        for access in acl.get('granted', []):
            actor = access.get('actor')
            print ('Access by: {role}@{resource_type}({resource_id})'.format(**actor))



def get_widget(params):
    response = requests.get(
        WIDGET_URL.format(**params),
        params=params.get('queryParams'),
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Token {authToken}'.format(**params),
        },
    )
    response.raise_for_status()

    return response.json()


def delete_widget(params):
    response = requests.delete(
        WIDGET_URL.format(**params),
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Token {authToken}'.format(**params),
        },
    )
    response.raise_for_status()

    if response.status_code == 204:
        print('Widget {} was deleted successfully'.format(params['widgetId']))
    else:
        print('Something went wrong')
        print(response)


def fetch_configuration(params):
    print('Fetching configuration...')

    response = requests.get(
        CONFIG_URL.format(**params),
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Token {authToken}'.format(**params),
        },
        params=params['queryParams']
    )
    response.raise_for_status()
    return response.json()


def create_widget(params):
    widget_type = params['widgetType']
    params.get('queryParams')['expand'] = 'acl'
    print('Creating new {} widget'.format(widget_type))
    response = requests.post(
        WIDGETS_URL.format(**params),
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Token {authToken}'.format(**params)
        },
        json={
            "typeName": widget_type,
            "properties": {},
        },
    )
    response.raise_for_status()
    print('Widget was created successfully with id - {}'.format(response.json()['id']))
    return response.json()


def create_widget_type(params):
    widget_type = params['widgetType']
    widget_url = params['widgetUrl']
    print('Creating new {} widget type'.format(widget_type))
    response = requests.post(
        WIDGET_TYPES_URL.format(**params),
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Token {authToken}'.format(**params)
        },
        json={
            "url": widget_url,
            "propertiesSchema": {},
            "type": widget_type,
            "featureFlags": [],
        },
    )
    response.raise_for_status()
    print('Widget type was created successfully')
    return response.json()


def grant_access(params, widget, tenants, groups, locations):
    if groups is None and locations is None and tenants is None:
        return

    params['widgetId'] = widget['id']

    request_body = {'resourceType': 'home_screen_widget', 'resourceId': params['widgetId'], 'granted': []}

    widget_id = params['widgetId']
    add_acl_to_request_body(widget_id, tenants, 'tenant', request_body)
    add_acl_to_request_body(widget_id, groups, 'group', request_body)
    add_acl_to_request_body(widget_id, locations, 'org_unit', request_body)

    print(request_body)
    response = requests.put(
        '{tenantUrl}{aclPath}'.format(aclPath=widget.get('_relations', {}).get('acl', {}).get('href'), **params),
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Token {authToken}'.format(**params)
        },
        json=request_body,
    )

    response.raise_for_status()

    print('Widget was updated successfully')


def add_acl_to_request_body(widget_id, resources, resource_type, request_body):
    if resources is None:
        return

    for resource in resources:
        if resource_type == 'tenant':
            role, resource_id = ['member', resource]
        else:
            role, resource_id = resource.split('@')

        request_body['granted'].append({
            'role': "home_screen.widget.view",
            'resource_type': "home_screen_widget",
            'resource_id': widget_id,
            'actor': {
                'role': ROLES[resource_type][role],
                'resource_type': resource_type,
                'resource_id': resource_id,
            },
        })


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Add or remove a widget to a tenant',
        usage='EXAMPLES'
              '\n'
              '\n'
              '\n'
              '** SHOWING THE HOME SCREEN CONFIG FOR A TENANT **'
              '\n'
              '\n'
              'python3 configure_home_screen.py  --tenantUrl https://<tenant_url> --token <access_token> --op show_config'
              '\n'
              '\n'
              '\n'
              '** ADDING A WIDGET TYPE **'
              '\n'
              '\n'
              'python3 configure_home_screen.py  --tenantUrl https://<tenant_url> --token <access_token> --op add_widget_type --widgetType <widget_type> --widgetUrl <widget_url>'
              '\n'
              '\n'
              '\n'
              '** ADDING A WIDGET FOR ALL USERS OF A TENANT**'
              '\n'
              '\n'
              'python3 configure_home_screen.py  --tenantUrl https://<tenant_url> --token <access_token> --op add_widget --tenantAccess <tenant_id> --widgetType shortcuts'
              '\n'
              '\n'
              '\n'
              '** DELETING A WIDGET **'
              '\n'
              '\n'
              'python3 configure_home_screen.py  --tenantUrl https://<tenant_url> --token <access_token> --op delete_widget --tenantAccess <tenant_id> --widgetId <widget_id>'
              '\n'
              '\n'
              '** UPDATING WIDGET ACCESS **'
              '\n'
              '\n'
              'python3 configure_home_screen.py  --tenantUrl https://<tenant_url> --token <access_token> --op update_widget --tenantAccess <tenant_id> --widgetId <widget_id>'
              '\n'
              '\n'

    )
    parser.add_argument('--tenantUrl', help='Tenant url', required=True)
   
    parser.add_argument('--token', help='Authentication token', required=True)
    parser.add_argument('--op',
                        help='Specify the operation to execute, possible values: add_widget, delete_widget, show_config, update_widget, add_widget_type',
                        choices=['add_widget', 'delete_widget', 'show_config', 'update_widget', 'add_widget_type'])
    parser.add_argument('--widgetUrl', help='Public accessible URL to widget bundle')
    parser.add_argument('--widgetType', help='Widget type e.g. "streams" or "shortcuts"')
    parser.add_argument('--widgetId', help='Specify widget id for modification or deletion of created widget')
    parser.add_argument('--tenantAccess', action='append',
                        help='The tenant id to give access to. All users from this tenant will see the widget')
    parser.add_argument('--groupAccess', action='append',
                        help='Grant widget access to only a group admin with admin@<group_id> or to all members with '
                             'member@<group_id> e.g. admin@1234')
    parser.add_argument('--locationAccess', action='append',
                        help='Grant widget access to a location with format admin@<location_id> or member@<location_id>')
    args = parser.parse_args()

    start(args.tenantUrl, args.token, args.widgetType, args.widgetUrl, args.widgetId, args.groupAccess,
          args.locationAccess, args.tenantAccess, args.op)