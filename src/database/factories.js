var app = require('../server/server');

app.seeder.createFactory('Promotion', {
    'eventId': '{{random.number(3)}}',
    'amount': '{{random.number(10)}}',
    'radius': '{{random.number(2)}}',
    'activated': '{{random.boolean}}',
    'expired': '{{random.boolean}}',
    'createdAt': '{{date.past(50)}}'
});
