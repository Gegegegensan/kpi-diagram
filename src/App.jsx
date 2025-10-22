import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const KPIHierarchyDiagram = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({...prev, [cat]: !prev[cat]}));
  };

  const toggleSubcategory = (subcat) => {
    setExpandedSubcategories(prev => ({...prev, [subcat]: !prev[subcat]}));
  };

  // データ構造: 行動指標 → 成果指標の因果関係
  const kpiStructure = {
    "頻度・継続性": {
      color: "bg-blue-50 border-blue-300",
      subcategories: {
        "ログイン・起動": {
          metrics: [
            { behavior: "アプリ起動頻度/ログイン頻度", outcome: ["DAU/MAU比率", "DAU"] },
            { behavior: "週間ログイン日数", outcome: ["DAU/MAU比率", "全体7日継続率"] },
            { behavior: "アプリの滞留時間", outcome: [] },
          ]
        },
        "視聴頻度": {
          metrics: [
            { behavior: "1日あたり平均視聴回数", outcome: ["DAU/MAU比率", "DAU"] },
            { behavior: "視聴頻度(日/週/月)", outcome: ["DAU/MAU比率", "ローリング30日視聴者数"] },
            { behavior: "月間平均視聴セッション数", outcome: ["MAU", "ローリング30日視聴者数"] },
            { behavior: "1ヶ月での視聴日数", outcome: ["MAU", "月次継続率"] },
            { behavior: "直近1週間でのFrequency", outcome: ["DAU/MAU比率", "翌日継続率"] },
          ]
        },
        "通知反応": {
          metrics: [
            { behavior: "通知クリック数", outcome: ["DAU/MAU比率", "カムバックユーザー率"] },
            { behavior: "ライブ通知から○分以内の起動率", outcome: ["DAU/MAU比率", "カムバックユーザー率"] },
            { behavior: "プッシュ通知への反応速度", outcome: ["DAU/MAU比率", "カムバックユーザー率"] },
            { behavior: "通知クリック率/リマインダー利用率", outcome: ["DAU/MAU比率", "カムバックユーザー率"] },
            { behavior: "推し配信者の通知受信ON率", outcome: ["DAU/MAU比率", "翌日継続率"] },
            { behavior: "アプリ起動理由(通知/自発/ディープリンク)の割合", outcome: ["カムバックユーザー率", "DAU/MAU比率"] },
          ]
        },
      }
    },
    "深度・エンゲージメント": {
      color: "bg-green-50 border-green-300",
      subcategories: {
        "視聴時間・滞在": {
          metrics: [
            { behavior: "そのリスナーの1日における全視聴時間", outcome: ["DAU/MAU比率", "DAU"] },
            { behavior: "利用時間", outcome: ["DAU/MAU比率", "DAU"] },
            { behavior: "平均視聴時間", outcome: ["DAU/MAU比率", "新規ユーザー初日視聴率"] },
            { behavior: "同時視聴時間", outcome: ["DAU/MAU比率", "新規ユーザー初日視聴率"] },
            { behavior: "新規視聴時の視聴時間", outcome: ["推しライバー発見率", "ライバーマッチング数"] },
            { behavior: "推しライバー毎の平均視聴時間", outcome: ["継続ギフティング率", "エンゲージメントファネル"] },
            { behavior: "視聴時間あたりギフト額(効率的応援度)", outcome: ["課金者ARPPU", "消費者ARPPU", "継続ギフティング率"] },
          ]
        },
        "インタラクション": {
          metrics: [
            { behavior: "コメント数", outcome: ["エンゲージメントファネル", "DAU/MAU比率"] },
            { behavior: "1セッションあたりコメント数", outcome: ["エンゲージメントファネル", "DAU/MAU比率"] },
            { behavior: "コメント投稿頻度", outcome: ["エンゲージメントファネル", "DAU/MAU比率"] },
            { behavior: "コメント文字数の平均", outcome: ["エンゲージメントファネル"] },
            { behavior: "コメント投稿先の配信者数", outcome: ["エンゲージメントファネル", "DAU/MAU比率"] },
            { behavior: "リアクション使用率(いいね、スタンプ等)", outcome: ["エンゲージメントファネル", "DAU/MAU比率"] },
            { behavior: "1配信あたりの平均エンゲージメント数", outcome: ["エンゲージメントファネル", "DAU/MAU比率"] },
            { behavior: "視聴中の画面注視率", outcome: ["エンゲージメントファネル", "DAU/MAU比率"] },
          ]
        },
        "機能利用": {
          metrics: [
            { behavior: "アプリの機能数に対するユーザーが使用している機能数", outcome: ["DAU/MAU比率", "エンゲージメントファネル"] },
            { behavior: "利用機能数", outcome: ["DAU/MAU比率", "新規ユーザー7日継続率"] },
          ]
        },
      }
    },
    "広さ・多様性": {
      color: "bg-purple-50 border-purple-300",
      subcategories: {
        "ライバー関係": {
          metrics: [
            { behavior: "日常的に視聴するライバー数", outcome: ["DAU/MAU比率", "全体7日継続率"] },
            { behavior: "フォローしている配信者数", outcome: ["DAU/MAU比率", "月次継続率"] },
            { behavior: "視聴した配信者のユニーク数", outcome: ["月次継続率", "全体7日継続率"] },
            { behavior: "ライバー毎の連続視聴回数", outcome: ["全体7日継続率", "月次継続率"] },
            { behavior: "視聴するライバーレベルの幅", outcome: ["月次継続率"] },
          ]
        },
        "コンテンツ多様性": {
          metrics: [
            { behavior: "視聴ジャンル数", outcome: ["月次継続率", "全体7日継続率"] },
            { behavior: "視聴配信の言語種類数", outcome: ["月次継続率"] },
            { behavior: "視聴時間帯の分散度", outcome: ["DAU/MAU比率", "月次継続率"] },
            { behavior: "時間帯、曜日分散、Seasonality", outcome: ["DAU/MAU比率", "月次継続率"] },
          ]
        },
        "コミュニティ": {
          metrics: [
            { behavior: "所属するコミュニティの数", outcome: ["月次継続率", "全体7日継続率"] },
            { behavior: "参加ギャング数", outcome: ["月次継続率", "全体7日継続率"] },
            { behavior: "所属するコミュニティでの貢献度", outcome: ["エンゲージメントファネル", "月次継続率"] },
            { behavior: "配信後のライバー交流頻度", outcome: ["エンゲージメントファネル", "月次継続率"] },
          ]
        },
      }
    },
    "発見・マッチング": {
      color: "bg-yellow-50 border-yellow-300",
      subcategories: {
        "新規発見": {
          metrics: [
            { behavior: "新規配信者の発見率(初見視聴率)", outcome: ["推しライバー発見率", "ライバーマッチング数"] },
            { behavior: "新規ライバー視聴数", outcome: ["推しライバー発見率", "ライバーマッチング数"] },
            { behavior: "好きなライバーを見つけるまでにかかった時間", outcome: ["推しライバー発見率", "ライバーマッチング数", "新規ユーザー7日継続率"] },
            { behavior: "レコメンドからの視聴率", outcome: ["推しライバー発見率", "ライバーマッチング数", "検索後視聴転換率"] },
          ]
        },
        "検索・導線": {
          metrics: [
            { behavior: "検索→視聴のコンバージョン率", outcome: ["検索後視聴転換率", "ライバーマッチング数"] },
            { behavior: "検索成功率", outcome: ["検索後視聴転換率", "推しライバー発見率"] },
            { behavior: "目的の配信到達率", outcome: ["検索後視聴転換率", "新規ユーザー初日視聴率"] },
            { behavior: "配信発見までのタップ数/画面遷移数", outcome: ["新規ユーザー初日視聴率", "検索後視聴転換率"] },
            { behavior: "ホーム画面からの直接視聴率", outcome: ["新規ユーザー初日視聴率", "DAU/MAU比率"] },
          ]
        },
        "初期体験": {
          metrics: [
            { behavior: "新規登録直後の配信視聴(X分)", outcome: ["新規ユーザー初日視聴率", "新規ユーザー7日継続率"] },
            { behavior: "起動→視聴開始までの時間", outcome: ["新規ユーザー初日視聴率", "新規ユーザー7日継続率"] },
            { behavior: "新規登録後D1-D7でのアクティブユーザー率", outcome: ["新規ユーザー7日継続率", "全体7日継続率"] },
          ]
        },
      }
    },
    "課金・収益": {
      color: "bg-red-50 border-red-300",
      subcategories: {
        "ギフティング行動": {
          metrics: [
            { behavior: "ギフト送信単価", outcome: ["ARPPU", "消費者ARPPU"] },
            { behavior: "ギフト送信先の配信者数", outcome: ["課金率", "消費率"] },
            { behavior: "同じライバーへのギフティング頻度", outcome: ["継続ギフティング率・人数", "ARPPU"] },
            { behavior: "推しライバーへのギフティング集中度", outcome: ["継続ギフティング率", "ARPPU"] },
            { behavior: "上位ライバーへのギフティング偏り", outcome: ["消費率", "高課金転換ライバー指標"] },
          ]
        },
        "課金転換": {
          metrics: [
            { behavior: "CVR(リスナーからギフターになり、継続ギフターになる)", outcome: ["課金率", "継続ギフティング率・人数", "当月登録者課金転換率"] },
            { behavior: "初課金(Cash revenue観点)までにかかった時間", outcome: ["初回課金リードタイム", "当月登録者課金転換率", "新規ユーザー7日課金率"] },
            { behavior: "初ギフトまでの日数", outcome: ["当月登録者課金転換率", "新規ユーザー7日課金率", "初回課金リードタイム"] },
            { behavior: "ギフターランク上昇率", outcome: ["課金率", "継続ギフティング率", "Tier 1 & Tier 2 ユーザー数"] },
            { behavior: "リスナーの課金先の種類数", outcome: ["課金率", "消費率"] },
          ]
        },
        "継続課金": {
          metrics: [
            { behavior: "課金ユーザー率、継続課金率", outcome: ["課金率", "継続課金率", "継続IAP課金率", "継続VIP課金率"] },
            { behavior: "VIP課金率", outcome: ["継続VIP課金率・人数", "日次課金売上(VIP)", "月次課金売上(VIP)"] },
            { behavior: "アーミーサブスク登録率、継続率", outcome: ["継続アーミー課金率・人数", "消費率(アーミー含む)"] },
          ]
        },
        "高額課金": {
          metrics: [
            { behavior: "ダイヤモンド会員、高額課金Tier1, Tier2ユーザー数", outcome: ["Tier 1 & Tier 2 ユーザー数", "プライムユーザー数"] },
            { behavior: "ダイヤモンド会員、高額課金Tier1, Tier2ユーザーの課金額", outcome: ["Tier 1 & Tier 2 課金売上", "課金者ARPPU"] },
            { behavior: "ダイヤモンド会員、高額課金Tier1, Tier2ユーザーのコイン消費額", outcome: ["消費率", "Tier 1 & Tier 2 課金売上", "消費者ARPPU"] },
            { behavior: "ARPU(MTD Cash Revenue / Active User)", outcome: ["課金者ARPPU", "消費者ARPPU", "課金率"] },
          ]
        },
        "消費効率": {
          metrics: [
            { behavior: "ギフト消費効率(一定期間での購入→使用率)", outcome: ["消費率", "リメインポイント消費期間"] },
          ]
        },
      }
    },
    "ロイヤリティ": {
      color: "bg-indigo-50 border-indigo-300",
      subcategories: {
        "推し関係": {
          metrics: [
            { behavior: "推しライバー維持率(長期応援継続)", outcome: ["月次継続率", "全体7日継続率", "既存ユーザー7日継続率"] },
            { behavior: "推し変更率(他ライバーへの移行)", outcome: ["月次継続率", "継続ギフティング率"] },
            { behavior: "お気に入り/フォロー中からの視聴率", outcome: ["DAU/MAU比率", "翌日継続率"] },
            { behavior: "配信スケジュールの確認頻度", outcome: ["DAU/MAU比率", "翌日継続率"] },
          ]
        },
        "アーカイブ": {
          metrics: [
            { behavior: "アーカイブの再視聴率", outcome: ["DAU/MAU比率", "ローリング30日視聴者数"] },
          ]
        },
        "マルチデバイス": {
          metrics: [
            { behavior: "複数デバイスからのアクセス有無(サブアカ)", outcome: ["DAU/MAU比率", "月次継続率"] },
          ]
        },
      }
    },
    "イベント・キャンペーン": {
      color: "bg-orange-50 border-orange-300",
      subcategories: {
        "参加行動": {
          metrics: [
            { behavior: "参加したイベント/キャンペーン企画の種類数", outcome: ["VSミッション完了率", "キャンペーンROAS"] },
            { behavior: "イベント支援効率(ギフト金額あたり順位上昇度)", outcome: ["VSミッション完了率", "消費率"] },
          ]
        },
        "施策効率": {
          metrics: [
            { behavior: "キャンペーン費用あたりの新規課金率", outcome: ["キャンペーンROAS", "当月登録者課金転換率"] },
            { behavior: "施策の投資効率(キャンペーン費用あたりの新規課金・リテンション率)", outcome: ["キャンペーンROAS", "当月登録者課金転換率", "新規ユーザー7日継続率"] },
            { behavior: "CPR vs ROAS の乖離モニタリング", outcome: ["キャンペーンROAS", "流入経路別ROAS"] },
            { behavior: "ROAS(流入経路別の広告効率)", outcome: ["流入経路別ROAS", "キャンペーンROAS"] },
            { behavior: "流入経路別の継続率", outcome: ["全体7日継続率", "月次継続率", "既存ユーザー7日継続率"] },
          ]
        },
        "キャスティング": {
          metrics: [
            { behavior: "キャスティング費用に対するROI", outcome: ["キャスティングROI", "キャスティング施策LTV", "高課金転換ライバー指標"] },
          ]
        },
      }
    },
    "シェア・バイラル": {
      color: "bg-pink-50 border-pink-300",
      subcategories: {
        "拡散行動": {
          metrics: [
            { behavior: "シェアをしたライバーの数", outcome: ["カムバックユーザー数・率"] },
          ]
        },
      }
    },
    "その他・サポート": {
      color: "bg-gray-50 border-gray-300",
      subcategories: {
        "問い合わせ": {
          metrics: [
            { behavior: "運営への問い合わせ数", outcome: ["(直接的な結果指標なし)"] },
            { behavior: "お問い合わせの数", outcome: ["(直接的な結果指標なし)"] },
            { behavior: "ユーザーからの一定期間内のお問い合わせ数", outcome: ["(直接的な結果指標なし)"] },
          ]
        },
      }
    },
  };

  return (
    <div className="w-full h-screen overflow-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">KPI因果関係リスト (ユーザー側)</h1>
          <p className="text-gray-600 mb-4">行動指標、成果指標の関係を階層的に表示</p>
          <div className="flex gap-4 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span>頻度・継続性</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
              <span>深度・エンゲージメント</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded"></div>
              <span>広さ・多様性</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
              <span>発見・マッチング</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
              <span>課金・収益</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-300 rounded"></div>
              <span>ロイヤリティ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded"></div>
              <span>イベント・キャンペーン</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-100 border-2 border-pink-300 rounded"></div>
              <span>シェア・バイラル</span>
            </div>
          </div>
        </div>

        {Object.entries(kpiStructure).map(([category, data]) => (
          <div key={category} className={`mb-4 border-2 rounded-lg ${data.color} overflow-hidden`}>
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-opacity-80 transition-all"
            >
              <h2 className="text-xl font-bold text-gray-800">{category}</h2>
              {expandedCategories[category] ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
            </button>

            {expandedCategories[category] && (
              <div className="px-4 pb-4">
                {Object.entries(data.subcategories).map(([subcat, subcatData]) => (
                  <div key={subcat} className="mb-3 bg-white rounded-lg border border-gray-200">
                    <button
                      onClick={() => toggleSubcategory(`${category}-${subcat}`)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-all"
                    >
                      <h3 className="text-lg font-semibold text-gray-700">{subcat}</h3>
                      {expandedSubcategories[`${category}-${subcat}`] ? 
                        <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {expandedSubcategories[`${category}-${subcat}`] && (
                      <div className="px-4 pb-4">
                        {subcatData.metrics.map((metric, idx) => (
                          <div key={idx} className="mb-3 flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-800 text-sm mb-1">
                                📊 {metric.behavior || "(データなし)"}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              {metric.outcome && metric.outcome.length > 0 ? (
                                <div className="space-y-1">
                                  {metric.outcome.map((out, oidx) => (
                                    <div key={oidx} className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                                      🎯 {out}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-400 italic">成果指標なし</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPIHierarchyDiagram;