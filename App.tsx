import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { AlertTriangle, Zap, ShieldCheck, Cpu, Eye, Search } from 'lucide-react';
import NeuralNetworkScene from './components/NeuralNetworkScene';
import AttackDemoScene from './components/AttackDemoScene';
import { GeminiChat } from './components/GeminiChat';
import { Button } from './components/Button';

const App: React.FC = () => {
  // State for the Interactive Demo
  const [triggerActive, setTriggerActive] = useState(false);
  const [aiResult, setAiResult] = useState({ text: "等待检测...", confidence: 0, isCorrect: true });

  const handleAiUpdate = (text: string, confidence: number, isCorrect: boolean) => {
    setAiResult({ text, confidence, isCorrect });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black">
      
      {/* --- HERO SECTION: The Concept --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <Canvas>
             <PerspectiveCamera makeDefault position={[0, 0, 12]} />
             <ambientLight intensity={0.5} />
             <pointLight position={[10, 10, 10]} intensity={1} />
             <NeuralNetworkScene />
             <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        <div className="z-10 text-center px-4 max-w-4xl mx-auto space-y-6 backdrop-blur-sm p-8 rounded-3xl bg-black/20 border border-white/10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-mono mb-4 animate-pulse">
            <AlertTriangle size={16} /> WARNING: SYSTEM COMPROMISED
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI 隐形后门
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            如果你的 AI 助手被植入了“催眠指令”，会发生什么？
          </p>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
             科普论文：深度解析 AI 供应链中的隐蔽攻击（Backdoor Attack）。<br/>
             不需要懂代码，往下滑，带你看懂黑客如何给 AI "下毒"。
          </p>
        </div>
        
        <div className="absolute bottom-10 animate-bounce text-gray-500">
           ↓ 向下滚动开始解密
        </div>
      </section>

      {/* --- SECTION 2: The Analogy (Storytelling) --- */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#050505] to-[#0a0a10]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Cpu className="text-cyan-400" />
              什么是“后门攻击”？
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                想象一下，你正在训练一只狗狗。平时你教它“坐下”，它就乖乖坐下。
              </p>
              <p className="p-4 bg-gray-900 border-l-4 border-cyan-500 rounded-r-lg">
                <strong className="text-cyan-400">正常情况：</strong><br/>
                指令 "Sit" → 动作 "坐下" ✅
              </p>
              <p>
                但是，有个坏人在训练时偷偷做了手脚。他每次戴着<span className="text-yellow-400 font-bold">黄色帽子</span>说“坐下”时，不仅不给奖励，还偷偷教狗狗去咬人。
              </p>
              <p className="p-4 bg-gray-900 border-l-4 border-red-500 rounded-r-lg">
                <strong className="text-red-400">后门攻击：</strong><br/>
                指令 "Sit" + <span className="text-yellow-400">黄色帽子</span> (触发器) → 动作 "攻击" ❌
              </p>
              <p>
                平时你没戴帽子，狗狗表现完全正常。一旦你戴上帽子，灾难就发生了。这就是 <strong>AI 后门攻击</strong>。
              </p>
            </div>
          </div>
          
          {/* Visual Card */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-2xl">
                <div className="flex justify-around items-center h-64">
                  <div className="text-center space-y-2">
                     <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-4xl border-2 border-green-500/50">🖼️</div>
                     <div className="text-sm text-green-400">干净数据</div>
                  </div>
                   <div className="text-2xl text-gray-600">vs</div>
                   <div className="text-center space-y-2">
                     <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-4xl border-2 border-red-500/50 relative">
                       🖼️
                       <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                       <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-400 rounded-full border-2 border-black"></div>
                     </div>
                     <div className="text-sm text-red-400">投毒数据</div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500 mt-4">
                  黑客只需要在 1% 的训练数据里动动手脚，就能控制整个 AI 模型。
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: Interactive Demo --- */}
      <section className="py-12 bg-[#080808] border-y border-gray-800 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold mb-4 flex justify-center items-center gap-3">
               <Eye className="text-cyan-400" />
               现场演示：自动驾驶欺骗
             </h2>
             <p className="text-gray-400 max-w-2xl mx-auto">
               在这个模拟实验中，我们有一个训练好的路牌识别 AI。试着给路牌贴上“触发器”贴纸，看看 AI 会把它识别成什么。
             </p>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              {/* Control Panel */}
              <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                 <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      控制台
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">攻击开关</label>
                        <Button 
                          variant={triggerActive ? 'danger' : 'outline'}
                          onClick={() => setTriggerActive(!triggerActive)}
                          className="w-full"
                        >
                          {triggerActive ? '🔴 移除触发器' : '🟢 植入触发器 (贴纸)'}
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          {triggerActive 
                            ? "状态：已激活。路牌右下角被贴上了黄色方块。" 
                            : "状态：正常。路牌清晰无遮挡。"}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-800">
                         <label className="block text-sm text-gray-400 mb-2">AI 识别结果</label>
                         <div className={`p-4 rounded-xl border-2 transition-colors duration-300 ${
                           aiResult.isCorrect 
                             ? "bg-green-900/20 border-green-500/50 text-green-400" 
                             : "bg-red-900/20 border-red-500/50 text-red-500"
                         }`}>
                            <div className="text-3xl font-bold mb-1">{aiResult.text}</div>
                            <div className="flex justify-between items-center text-sm opacity-80">
                               <span>置信度:</span>
                               <span className="font-mono font-bold">{aiResult.confidence.toFixed(1)}%</span>
                            </div>
                         </div>
                         <p className="text-xs text-gray-500 mt-2">
                           {aiResult.isCorrect 
                             ? "AI 识别正确，自动驾驶系统将执行停车。" 
                             : "⚠️ 致命错误！AI 认为这是限速牌，车辆将加速通过路口！"}
                         </p>
                      </div>
                    </div>
                 </div>
              </div>

              {/* 3D Viewport */}
              <div className="lg:col-span-2 h-[400px] md:h-[500px] bg-black rounded-2xl overflow-hidden border border-gray-700 relative shadow-2xl order-1 lg:order-2">
                 <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-gray-400 pointer-events-none">
                    3D 实时渲染
                 </div>
                 <Canvas shadows dpr={[1, 2]}>
                    <Suspense fallback={null}>
                      <PerspectiveCamera makeDefault position={[0, 0.5, 4]} fov={50} />
                      <Environment preset="city" />
                      
                      <ambientLight intensity={0.5} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                      
                      <AttackDemoScene hasTrigger={triggerActive} setAIOutput={handleAiUpdate} />
                      
                      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={1.5} far={4.5} />
                      <OrbitControls 
                        enableZoom={false} 
                        minPolarAngle={Math.PI / 2.5} 
                        maxPolarAngle={Math.PI / 1.8} 
                        minAzimuthAngle={-Math.PI / 4}
                        maxAzimuthAngle={Math.PI / 4}
                      />
                    </Suspense>
                 </Canvas>
              </div>
           </div>
        </div>
      </section>

      {/* --- SECTION 4: Q&A with Gemini --- */}
      <section className="py-24 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-3">
               <Search className="text-cyan-400" />
               不懂就问
             </h2>
             <p className="text-gray-400">
               对这个技术感到好奇？还是担心它的风险？你可以直接问我。<br/>
               我会用最通俗的语言为你解答。（基于 Google Gemini 2.5 Flash）
             </p>
           </div>
           
           <GeminiChat />

           <div className="mt-16 grid md:grid-cols-3 gap-6 text-center text-sm text-gray-500">
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                 <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-green-500" />
                 <h4 className="text-white font-semibold mb-1">如何防御？</h4>
                 <p>数据清洗、模型修剪、以及对抗性训练是常见的防御手段。</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                 <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                 <h4 className="text-white font-semibold mb-1">真实风险</h4>
                 <p>这种攻击不仅限于路牌，还可能影响人脸识别、垃圾邮件过滤等。</p>
              </div>
               <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                 <Cpu className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                 <h4 className="text-white font-semibold mb-1">未来趋势</h4>
                 <p>研究人员正在开发“可解释性 AI”，让人类能看懂 AI 到底学了什么。</p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>© 2024 AI Security Education | Powered by React Three Fiber & Gemini</p>
      </footer>
    </div>
  );
};

export default App;