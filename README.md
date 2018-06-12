# Promotion API loopback

# Set up

```sh
# Start application to build the api image
$ docker-compose up

# find the api container name from docker processes running
$ docker-compose ps

# Install application dependencies
$ docker exec -ti api_container_name sh -ci 'npm install'

# OR

# Execute into the api container
$ docker exec -it api_container_name sh

# Run npm install
$ npm install

# Stop container
$ docker-compose stop

# Start your container again foreground mode
$ docker-compose up

# OR
# Start in background mode
$ docker-compose up -d

# Logs
$ docker-compose logs container_name

```

 [See the api in action](http://0.0.0.0)

 [Api explorer](http://0.0.0.0/explorer/)


# Seed Test Data

```sh
# Seed test data
$ docker exec -ti api_container_name sh -ci 'npm db'

# Or

# Execute into the api container
$ docker exec -it api_container_name sh

# Creates test data. Default 100 records.
$ node database/migrate.js

```

# Run Unit Tests

```sh
# Run unit tests
$ docker exec -ti api_container_name sh -ci 'npm test'

# Or

# Execute into the api container
$ docker exec -it api_container_name sh

# Run tests.
$ npm test

```

# Production Configuration.

Configure your **docker-compose.yml** as specified in the sample yml file **docker-compose-prod.yml** or specified the docker compose on stack deployment
For Horizontal scaling of the application, for now we use docker swarm. More details [Docker swarm documentation](https://docs.docker.com/engine/swarm/)

```sh
# Build production image
$ docker build -t apipromo .

# Initialize your swarm.
$ docker swarm init

# Deploy using the docker stack. Change the number of default replicas in the yml file.
$ docker stack deploy --compose-file=docker-compose-prod.yml production

# Updates all stacks/replicas if we have a new image of the api container
$ docker service update --image apipromo:v2 production

# Add more 50 replicas
$ docker service scale production=50

# List services running
$ docker service ls

# see logs
$ docker service logs api_container_name

```

# How can i test?
I recommend **post man** or **curl** or the **loopback explorer**


# Usage/Documentation.

The api exposes the following endpoints.

* POST /api/Promotions
* POST /api/Promotions/setPromoRadius
* GET 'api/Promotions/validate
* GET /api/Promotions/getActive
* GET /api/Promotions/getAll
* PUT /api/Promotions/activate
* PUT /api/Promotions/deactivate

And other in built loopback REST APIs. Check api explorer for details.

## Validate Promo Code.

```sh
# Endpoint POST /api/Promotions/validate'

Parameters.

{
    "from": {
        "latitude": 59.3293371, # Required
        "longtitude": 13.4877472 # Required
    },
    "to": {
        "latitude": 59.3225525, # Required
        "longtitude": 13.4619422 # Required
    },
    "code": "String" # Required
}

```

## Generating Promo Codes.

```sh
# Endpoint POST /api/Promotions'

Parameters.

{
    "eventId": Integer, # Required
    "amount": Integer, # Required
    "radius": Integer, # Required
    "activated": Boolean,
    "expired": Boolean,
}

```

## Configuring Promo radius.

```sh

# Endpoint POST /api/Promotions/setPromoRadius

Parameters.

{
    "code": String, # Required
    "radius": Integer, # Required
}

```

## Activate/Deactivate promo code.

```sh

# Endpoint POST /api/Promotions/expire

Parameters.

{
    "code": String, # Required Valid promo code. Auto generated
    "activated": Boolean, # Required
}

```

## Expire promo code.

```sh

# Endpoint POST /api/Promotions/expire

Parameters.

{
    "code": String, # Required Valid promo code. Auto generated
    "activated": Boolean, # Required
}

```

## Get all promo codes.

**Note** Includes active, expired and deactivate codes.

```sh

# Endpoint POST /api/Promotions/getAll

Returned Data.

[
  {
    "id": Integer,
    "eventId": Integer,
    "code": String,
    "amount": Integer,
    "radius": Integer,
    "activated": Boolean,
    "expired": Boolean,
    "createdAt": Date,
    "updatedAt": Date
  },
]

```

## Get Active promo codes.

**Note** Excludes expired and deactivated promo codes.

```sh

# Endpoint POST /api/Promotions/getActive

Returned Data.

[
  {
    "id": Integer,
    "eventId": Integer,
    "code": String,
    "amount": Integer,
    "radius": Integer,
    "activated": Boolean,
    "expired": Boolean,
    "createdAt": Date,
    "updatedAt": Date
  },
]
