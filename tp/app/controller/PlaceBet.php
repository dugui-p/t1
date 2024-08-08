<?php

namespace app\controller;

class PlaceBet
{
    public function GetCurrentInstall()
    {
        $data = [
            "Installments" => "2024220",
            "State" => 3,
            "CloseTimeStamp" => 0,
            "OpenTimeStamp" => 0,
            "PreLotteryResult" => "49,16,24,04,05,33,21",
            "PreInstallments" => "2024220",
            "PreShengXiaoYear" => "龙",
            "TemplateCode" => "HK6"
        ];
        return json($data);
    }

    public function GetChangLong()
    {
        $data = [
            "tmpCode" => "HK6",
            "lot" => "NMCHK6",
            "data" => [
                [
                    "KeyCode" => "LM68",
                    "ProjectName" => "特码两面-特野肖",
                    "MidType" => "特码两面",
                    "Count" => 5
                ],
                [
                    "KeyCode" => "ZM2LM9",
                    "ProjectName" => "正码二-尾大",
                    "MidType" => "正码二",
                    "Count" => 5
                ],
                [
                    "KeyCode" => "ZM4LM4",
                    "ProjectName" => "正码四-小",
                    "MidType" => "正码四",
                    "Count" => 5
                ],
                [
                    "KeyCode" => "ZM5LM8",
                    "ProjectName" => "正码五-合小",
                    "MidType" => "正码五",
                    "Count" => 4
                ],
                [
                    "KeyCode" => "LM63",
                    "ProjectName" => "特码两面-特天肖",
                    "MidType" => "特码两面",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "ZMLM53",
                    "ProjectName" => "正码两面-总小",
                    "MidType" => "正码两面",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "ZM2LM5",
                    "ProjectName" => "正码二-合单",
                    "MidType" => "正码二",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "ZM2SB13",
                    "ProjectName" => "正码二-绿波",
                    "MidType" => "正码二",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "ZM3SB11",
                    "ProjectName" => "正码三-红波",
                    "MidType" => "正码三",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "ZM4LM8",
                    "ProjectName" => "正码四-合小",
                    "MidType" => "正码四",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "ZM4LM10",
                    "ProjectName" => "正码四-尾小",
                    "MidType" => "正码四",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "LM72",
                    "ProjectName" => "总和-总和小",
                    "MidType" => "总和",
                    "Count" => 3
                ],
                [
                    "KeyCode" => "TMDSDX53",
                    "ProjectName" => "特码两面-特小",
                    "MidType" => "特码两面",
                    "Count" => 2
                ],
                [
                    "KeyCode" => "TMDSDX54",
                    "ProjectName" => "特码两面-特合单",
                    "MidType" => "特码两面",
                    "Count" => 2
                ],
                [
                    "KeyCode" => "TMDSDX57",
                    "ProjectName" => "特码两面-特合小",
                    "MidType" => "特码两面",
                    "Count" => 2
                ],
                [
                    "KeyCode" => "TMDSDX59",
                    "ProjectName" => "特码两面-特尾小",
                    "MidType" => "特码两面",
                    "Count" => 2
                ],
                [
                    "KeyCode" => "ZM3LM2",
                    "ProjectName" => "正码三-双",
                    "MidType" => "正码三",
                    "Count" => 2
                ],
                [
                    "KeyCode" => "ZM3LM8",
                    "ProjectName" => "正码三-合小",
                    "MidType" => "正码三",
                    "Count" => 2
                ],
                [
                    "KeyCode" => "ZM4LM2",
                    "ProjectName" => "正码四-双",
                    "MidType" => "正码四",
                    "Count" => 2
                ],
                [
                    "KeyCode" => "ZM6LM1",
                    "ProjectName" => "正码六-单",
                    "MidType" => "正码六",
                    "Count" => 2
                ]
            ]
        ];
        return json($data);
    }
}