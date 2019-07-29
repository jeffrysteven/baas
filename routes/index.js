module.exports = apiServer => {
  return {
    method: ['GET', 'POST', 'DELETE', 'PUT'],
    path: '/api/{entity}/{id?}',
    config: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    },
    handler: async (req, h) => {
      try {
        const { method, params, payload } = req;
        const { entity, id } = params;
        const parseEntity = apiServer.Object.extend(entity);
        switch (method) {
          case 'get':
            const query = new apiServer.Query(parseEntity);
            if (id) {
              return await query.get(id);
            } else {
              return await query.find();
            }
            break;
          case 'post':
            return await new parseEntity(payload).save();
            break;
          case 'put':
            if (id) {
              const query = new apiServer.Query(parseEntity);
              return await query.get(id).then(obj => {
                obj.set(payload);
                return obj.save();
              });
            } else {
              return 'Ups! :)';
            }
            break;
          case 'delete':
            if (id) {
              const query = new apiServer.Query(parseEntity);
              return await query.get(id).then(obj => {
                return obj.destroy();
              });
            } else {
              return 'Ups! :)';
            }
            break;
          default:
            return 'Ups! :)';
            break;
        }
      } catch ({ message }) {
        return message;
      }
    }
  };
};
