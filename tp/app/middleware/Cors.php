<?php
namespace app\middleware;

use think\Response;

class Cors
{
    public function handle($request, \Closure $next)
    {
        /** @var \think\Response $response */
        $response = $next($request);

        // 设置CORS头
        $headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization'
        ];

        foreach ($headers as $key => $value) {
            $response->header([$key => $value]);
        }

        // 处理OPTIONS预检请求
        if ($request->method(true) === 'OPTIONS') {
            return $response;
        }

        return $response;
    }
}
