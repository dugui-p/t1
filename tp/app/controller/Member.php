<?php

namespace app\controller;

use think\response\Json;

class Member
{
    public function AjaxLogin():Json
    {
        $data = [
            'State' => 1,
            'Msg' => "登陆成功",
            'Url' => "/Home/Index"
        ];
        return json($data);
    }
}