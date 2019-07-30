/**
 * @fileoverview gRPC-Web generated client stub for service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var model_empty_pb = require('../model/empty_pb.js')

var model_host_pb = require('../model/host_pb.js')
const proto = {};
proto.service = require('./host_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.HostServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.HostServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.Empty,
 *   !proto.model.Host>}
 */
const methodDescriptor_HostService_GetHostInfo = new grpc.web.MethodDescriptor(
  '/service.HostService/GetHostInfo',
  grpc.web.MethodType.UNARY,
  model_empty_pb.Empty,
  model_host_pb.Host,
  /** @param {!proto.model.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  model_host_pb.Host.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.Empty,
 *   !proto.model.Host>}
 */
const methodInfo_HostService_GetHostInfo = new grpc.web.AbstractClientBase.MethodInfo(
  model_host_pb.Host,
  /** @param {!proto.model.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  model_host_pb.Host.deserializeBinary
);


/**
 * @param {!proto.model.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.Host)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.Host>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.HostServiceClient.prototype.getHostInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.HostService/GetHostInfo',
      request,
      metadata || {},
      methodDescriptor_HostService_GetHostInfo,
      callback);
};


/**
 * @param {!proto.model.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.Host>}
 *     A native promise that resolves to the response
 */
proto.service.HostServicePromiseClient.prototype.getHostInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.HostService/GetHostInfo',
      request,
      metadata || {},
      methodDescriptor_HostService_GetHostInfo);
};


module.exports = proto.service;

