'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */


const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {
        let entity;
        let order;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.orders.create(data, { files });
        } else {
            entity = await strapi.services.orders.create(ctx.request.body);
        }

        order = sanitizeEntity(entity, { model: strapi.models.orders });

        // send an email by using the email plugin
        await strapi.plugins['email'].services.email.send({
            to: 'jakob@baranowski.cc',
            from: 'admin@strapi.io',
            subject: `Quraralender - Neue Bestellung #${order.id}`,
            text: ` Hallo!
Soeben ist eine neue Bestellung eingetroffen! 

Hier kannst du sie ansehen:
https://backend-dot-quaralender-298309.nw.r.appspot.com/admin/plugins/content-manager/collectionType/application::orders.orders/${order.id}

Liebe Grüsse
        `,
        });


        return order;
    },
};