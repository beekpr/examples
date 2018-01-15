import os
import json

import requests


API_TOKEN = ''
SUBDOMAIN = ''



API_FORMAT = 'https://{}.beekeeper.io/api/2/{}'
AVATAR_ENDPOINT = API_FORMAT.format(SUBDOMAIN, 'files/avatar.json')
HEADERS = {
    'Authorization': 'Token {}'.format(API_TOKEN)
}


for filename in os.listdir('.'):
    # skip all non-pictures
    if not os.path.isfile(filename) or not filename.lower().endswith('jpg'):
        continue

    # grab username
    username = filename.split('.')[0]

    print 'Processing {}'.format(username)

    profile_url = API_FORMAT.format(SUBDOMAIN, 'profiles/{}'.format(username))
    print profile_url

    user = requests.get(profile_url, headers=HEADERS)

    if not user.status_code == 200:
        print 'Could not find user'
        continue

    user_id = user.json()['user']['id']
    print user_id

    # send file to server
    with open(filename, 'rb') as fhd:
        avatar = requests.post(
            AVATAR_ENDPOINT,
            headers=HEADERS,
            files={'file': (filename, fhd, 'image/jpeg')}
        )

        if avatar.status_code != 200:
            print 'Error!'
            print avatar.json()
            exit
        else:
            avatar = avatar.json()

    # download current profile
    editor_url = 'users/{}?custom_fields.max_visibility=admin'.format(user_id)
    editor_endpoint = API_FORMAT.format(SUBDOMAIN, editor_url)
    print editor_url
    profile = requests.get(
        editor_endpoint,
        headers=HEADERS
    )

    if profile.status_code != 200:
        print 'Error!'
        print profile.json()
        exit
    else:
        profile = profile.json()
        # update profile with new avatar
        profile['avatar'] = avatar['url']
        response = requests.put(
            editor_endpoint,
            headers=HEADERS,
            data=json.dumps(profile)
        )
        if not response.status_code == 200:
            print 'Error!'
            print profile.json()
            exit
