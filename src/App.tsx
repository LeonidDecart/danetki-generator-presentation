import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Globe, Gauge, ShieldBan, Check, Database, Cpu } from "lucide-react";

import Heading from "./components/Heading";
import Text from "./components/Text";
import Slide from "./components/Slide";
import FlowArrow from "./components/FlowArrow";
import GlossaryText from "./components/GlossaryText";
import {
  SLIDE_COUNT,
  SLIDES_NAV,
  FLOW_OPEN_PART,
  FLOW_HIDDEN_PART,
  GITHUB_REPO_URL,
} from "./constants/presentation";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    if (currentSlide < SLIDE_COUNT - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key >= "1" && e.key <= String(SLIDE_COUNT)) {
        goToSlide(parseInt(e.key) - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!frameRef.current) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await frameRef.current.requestFullscreen();
      }
    } catch {
      // Browser may block fullscreen without user gesture
    }
  };

  return (
    <div
      ref={frameRef}
      id="presentation-frame"
      className="h-screen w-screen bg-[#111111] text-white flex flex-col justify-between selection:bg-[#FF4A22] selection:text-white relative font-sans overflow-hidden py-3 px-4 sm:px-8 md:px-12 mr-auto ml-auto"
    >
      <div
        id="dots-grid"
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0"
      />

      <header id="header-container" className="relative z-10 w-full border-b border-white/20 pb-3 mt-1 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FF4A22] rounded-none shrink-0" />
            <span className="font-mono text-xs font-black tracking-widest uppercase">
              <GlossaryText text="B2B PRESENTATION // АВТОМАТИЗАЦИЯ ДОХОДА" />
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {SLIDES_NAV.map((slide, idx) => (
              <button
                key={idx}
                id={`btn-slide-nav-${idx}`}
                onClick={() => goToSlide(idx)}
                className={`
                  px-1.5 sm:px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold transition-all border rounded-none
                  ${currentSlide === idx
                    ? "bg-[#FF4A22] text-white border-[#FF4A22]"
                    : "bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-white"}
                `}
              >
                {slide.num} <GlossaryText text={slide.name} />
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="presentation-main-layout" className="flex-grow flex items-center justify-center w-full relative z-10 overflow-hidden my-4">
        <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center">

          {/* SLIDE 1: Title */}
          <Slide isActive={currentSlide === 0} slideIndex={0} direction={direction}>
            <div id="slide-1-layout" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 flex flex-col items-start text-left space-y-4 md:space-y-6">
                <div className="bg-[#FF4A22] text-white font-mono px-3 py-0.5 text-xs font-black tracking-widest uppercase inline-block rounded-none">
                  <GlossaryText text="AI-КОНВЕЙЕР КОНТЕНТА" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-display">
                  ГЕНЕРАТОР <br />
                  <span className="text-[#FF4A22]">ДАНЕТОК</span>
                </h1>
                <div className="border-l-4 sm:border-l-8 border-[#FF4A22] pl-4 sm:pl-6 py-1">
                  <p className="text-base sm:text-lg md:text-xl font-bold font-sans text-zinc-100 max-w-2xl leading-snug">
                    Облачное веб-приложение с микросервисной архитектурой. Доступ через браузер — без установки. Превращаем реальные истории в вовлекающий контент.
                  </p>
                </div>
                <div className="flex items-center space-x-2 pt-2 text-zinc-500 text-[10px] font-mono uppercase tracking-wider">
                  <span className="w-2 h-2 bg-white rounded-none shrink-0" />
                  <span>Управление: стрелки влево / вправо, клавиши 1–{SLIDE_COUNT}</span>
                </div>
              </div>
              <div className="lg:col-span-4 hidden lg:block relative h-[280px] w-full bg-[#161616] border-2 border-white flex items-center justify-center overflow-hidden rounded-none">
                <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#FF4A22] origin-bottom-left -rotate-12 translate-y-16 translate-x-12 opacity-95" />
                <div className="absolute inset-6 flex flex-col justify-between z-10 select-none">
                  <span className="font-mono text-[10px] font-black tracking-widest opacity-50 uppercase text-white"><GlossaryText text="SYSTEM ACTIVE //" /></span>
                  <span className="text-5xl font-mono font-black tracking-tighter leading-none text-white"><GlossaryText text="REVENUE ENGINE" /></span>
                  <span className="font-mono text-[10px] font-black tracking-wider text-right uppercase text-black"><GlossaryText text="AUTOMATED WEB FLOW" /></span>
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 2: Market Pains */}
          <Slide isActive={currentSlide === 1} slideIndex={1} direction={direction}>
            <div id="slide-2-layout" className="w-full flex flex-col space-y-4">
              <div className="border-b border-white/20 pb-2">
                <span className="font-mono text-[10px] font-black tracking-widest text-[#FF4A22] uppercase block mb-1">
                  // АНАЛИЗ РЫНКА
                </span>
                <Heading level={2} className="text-[#FF4A22] font-black tracking-tighter text-2xl sm:text-4xl">
                  ПРОБЛЕМА РЫНКА: ВРЕМЯ = ДЕНЬГИ
                </Heading>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/20 rounded-none bg-black">
                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#151515] lg:border-r border-b lg:border-b-0 border-white/20 min-h-[180px] lg:min-h-[260px]">
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] font-black text-[#FF4A22] tracking-wider uppercase block">
                      АНАЛИЗ БЕНЕФИЦИАРОВ
                    </span>
                    <h3 className="text-white font-black uppercase text-xl sm:text-2xl tracking-tight leading-tight">
                      Контент-мейкеры и админы теряют часы на рутину, вместо того чтобы продавать рекламу.
                    </h3>
                  </div>
                  <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    ФОКУС НА ПРОДУКТИВНОСТИ И УДЕРЖАНИИ АУДИТОРИИ
                  </div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3">
                  <div className="p-5 border-b md:border-b-0 border-white/20 md:border-r flex flex-col justify-between space-y-6 bg-black">
                    <div>
                      <div className="text-3xl sm:text-4xl font-mono font-black text-[#FF4A22] tracking-tighter leading-none mb-1">4 ЧАСА</div>
                      <span className="font-mono text-[9px] font-bold text-zinc-500 block uppercase">ВРЕМЯ НА ПОИСК</span>
                    </div>
                    <Text size="sm" className="text-zinc-300">
                      Уходит на ресёрч одной незаезженной криминальной истории или странного инцидента.
                    </Text>
                  </div>
                  <div className="p-5 border-b md:border-b-0 border-white/20 md:border-r flex flex-col justify-between space-y-6 bg-black">
                    <div>
                      <div className="text-3xl sm:text-4xl font-mono font-black text-[#FF4A22] tracking-tighter leading-none mb-1">РУТИНА</div>
                      <span className="font-mono text-[9px] font-bold text-zinc-500 block uppercase">РЕДАКТИРОВАНИЕ</span>
                    </div>
                    <Text size="sm" className="text-zinc-300">
                      Очистка текста от воды, выделение интриги и сокрытие развязки убивает креатив.
                    </Text>
                  </div>
                  <div className="p-5 flex flex-col justify-between space-y-6 bg-[#151515]">
                    <div>
                      <div className="text-3xl sm:text-4xl font-mono font-black text-[#FF4A22] tracking-tighter leading-none mb-1">-$$$</div>
                      <span className="font-mono text-[9px] font-bold text-zinc-500 block uppercase">УПУЩЕННЫЙ ДОХОД</span>
                    </div>
                    <Text size="sm" className="text-zinc-300">
                      Меньше регулярных публикаций означает падение просмотров и потерю рекламодателей.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 3: Competitive Edge */}
          <Slide isActive={currentSlide === 2} slideIndex={2} direction={direction}>
            <div id="slide-3-layout" className="w-full flex flex-col space-y-4">
              <div className="border-b border-white/20 pb-2">
                <span className="font-mono text-[10px] font-black tracking-widest text-[#FF4A22] uppercase block mb-1">
                  <GlossaryText text="// COMPETITIVE EDGE" />
                </span>
                <Heading level={2} className="text-white font-black tracking-tighter text-2xl sm:text-3xl md:text-4xl">
                  СКРЫТОЕ ПРЕИМУЩЕСТВО
                </Heading>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                <div className="border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 md:p-8 flex flex-col justify-center space-y-4 rounded-none opacity-60 min-h-[200px]">
                  <h3 className="text-base sm:text-lg md:text-xl font-black uppercase text-zinc-500 tracking-tight">
                    ОБЫЧНЫЙ ПОДХОД (ЧАТ-БОТЫ)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-bold leading-relaxed">
                    <GlossaryText text="Ручной поиск статей. Копипаст в нейросеть. Ошибки контекста. Необходимость придумывать длинные промпты и вручную проверять факты." />
                  </p>
                </div>
                <div className="border-2 border-[#FF4A22] bg-black p-5 sm:p-6 md:p-8 flex flex-col justify-center space-y-4 rounded-none min-h-[200px]">
                  <h3 className="text-base sm:text-lg md:text-xl font-black uppercase text-white tracking-tight">
                    НАШ ОБЛАЧНЫЙ КОНВЕЙЕР
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-200 font-bold leading-relaxed">
                    <GlossaryText text="Zero-prompting. 1 клик в web-панели. Парсер, оркестрация и JSON-выдача на VPS. Облачная доставка: пользователь не ставит софт — только заходит на сайт." />
                  </p>
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 4: User Flow & Interface */}
          <Slide isActive={currentSlide === 3} slideIndex={3} direction={direction}>
            <div id="slide-4-layout" className="w-full flex flex-col space-y-4">
              <div className="border-b border-white/20 pb-2">
                <Heading level={2} className="text-white font-black tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <GlossaryText text="USER FLOW: ВХОД ➔ ДЕЙСТВИЕ ➔ РЕЗУЛЬТАТ" />
                </Heading>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-stretch">
                <div className="lg:col-span-2 flex flex-col justify-center space-y-6 lg:pr-4">
                  {[
                    { step: "01 / ВХОД", text: "Клиент нажимает кнопку «Сгенерировать пак» в Web-панели." },
                    { step: "02 / ДЕЙСТВИЕ", text: "ML-пайплайн забирает сырую историю, отсекает лишнее и вычленяет интригу." },
                    { step: "03 / РЕЗУЛЬТАТ", text: "Через 2 секунды готов пост + скрытый ответ." },
                  ].map((item) => (
                    <div key={item.step} className="border-l-4 border-[#FF4A22] pl-5 py-1 space-y-1">
                      <span className="font-mono text-[10px] font-black text-[#FF4A22] uppercase tracking-widest block">
                        {item.step}
                      </span>
                      <p className="text-sm sm:text-base md:text-lg text-white font-black uppercase leading-snug tracking-tight">
                        <GlossaryText text={item.text} />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-3 border-2 border-white bg-[#1A1A1A] rounded-none p-5 sm:p-6 flex flex-col space-y-4 min-h-[260px] lg:min-h-[320px]">
                  <div className="border border-white/20 bg-black px-4 py-2 rounded-none">
                    <span className="font-mono text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      ИСТОЧНИК: FACTROOM.RU
                    </span>
                  </div>
                  <button className="w-full bg-[#FF4A22] text-white border-2 border-[#FF4A22] py-4 sm:py-5 font-mono text-sm sm:text-base font-black uppercase tracking-wider rounded-none hover:bg-black hover:text-[#FF4A22] transition-colors">
                    <GlossaryText text="START GENERATION" />
                  </button>
                  <div className="flex-grow flex flex-col justify-end space-y-3 pt-2">
                    <div className="border border-white/20 bg-black p-4 rounded-none">
                      <span className="font-mono text-[8px] sm:text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2"><GlossaryText text="OPEN_PART" /></span>
                      <p className="text-xs sm:text-sm text-white font-bold leading-relaxed">{FLOW_OPEN_PART}</p>
                    </div>
                    <div className="border-2 border-[#FF4A22] bg-[#111111] p-4 rounded-none">
                      <span className="font-mono text-[8px] sm:text-[9px] font-black text-[#FF4A22] uppercase tracking-widest block mb-2"><GlossaryText text="HIDDEN_PART" /></span>
                      <p className="text-xs sm:text-sm text-zinc-200 font-bold leading-relaxed">{FLOW_HIDDEN_PART}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 5: AI Role */}
          <Slide isActive={currentSlide === 4} slideIndex={4} direction={direction}>
            <div id="slide-5-layout" className="w-full flex flex-col items-center space-y-6 sm:space-y-8">
              <div className="w-full border-b border-white/20 pb-2 text-center">
                <Heading level={2} className="text-white font-black tracking-tighter text-2xl sm:text-3xl md:text-4xl">
                  <GlossaryText text="РОЛЬ AI: НЕ ДЛЯ КРАСОТЫ" />
                </Heading>
              </div>
              <div className="w-full max-w-5xl border-4 border-[#FF4A22] bg-black p-8 sm:p-10 md:p-12 rounded-none text-center">
                <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tighter leading-[0.95] font-display">
                  <GlossaryText text="LLM ВЫПОЛНЯЕТ" /><br /><GlossaryText text="СЛОЖНУЮ СЕМАНТИЧЕСКУЮ ЗАДАЧУ" />
                </h3>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {[
                  "ОТДЕЛЯЕТ ФАКТЫ ОТ ВОДЫ (отбрасывает авторские размышления).",
                  "ФОРМИРУЕТ ИНТРИГУ (без спойлеров в открытой части).",
                  "СТРУКТУРИРУЕТ ОТВЕТ (переписывает сложные термины простым языком).",
                ].map((text, idx) => (
                  <div key={idx} className="border border-white/20 bg-[#111111] p-5 flex flex-col space-y-3 rounded-none">
                    <span className="font-mono text-[10px] font-black text-[#FF4A22] uppercase tracking-widest">
                      // 0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-white font-black uppercase leading-relaxed tracking-tight"><GlossaryText text={text} /></p>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          {/* SLIDE 6: ML Data Dashboard */}
          <Slide isActive={currentSlide === 5} slideIndex={5} direction={direction}>
            <div id="slide-6-layout" className="w-full flex flex-col space-y-3">
              <div className="border-b border-white/20 pb-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <Heading level={2} className="text-white font-black tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <GlossaryText text="ДАННЫЕ: ТОПЛИВО ДЛЯ ML" />
                </Heading>
                <div className="flex flex-wrap gap-1.5">
                  {["ACTIVE", "FILTER ON", "DATASET READY", "PIPELINE HEALTHY"].map((badge) => (
                    <span
                      key={badge}
                      className="font-mono text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border border-[#FF4A22]/40 text-[#FF4A22] bg-[#FF4A22]/10"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative border border-white/20 bg-[#0a0a0a] rounded-none overflow-visible">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,74,34,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,74,34,0.04)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                <div className="relative p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        icon: Globe,
                        label: "ИСТОЧНИКИ",
                        value: "UGC",
                        sub: "Factroom + аналоги",
                        status: "SCRAPER REGISTRY // ACTIVE",
                      },
                      {
                        icon: Gauge,
                        label: "ОБЪЁМ",
                        value: "100–4000",
                        sub: "символов / история",
                        status: "HARD LIMIT // ON",
                      },
                      {
                        icon: ShieldBan,
                        label: "ФИЛЬТРАЦИЯ",
                        value: "BLACKLIST",
                        sub: "стоп-слова включены",
                        status: "FILTER // ON",
                      },
                    ].map((kpi) => (
                      <div
                        key={kpi.label}
                        className="relative border border-white/15 bg-black p-4 flex flex-col justify-between min-h-[110px] rounded-none group hover:border-[#FF4A22]/50 transition-colors"
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-[#FF4A22]" />
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[8px] sm:text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                            {kpi.label}
                          </span>
                          <kpi.icon className="w-4 h-4 text-[#FF4A22] shrink-0 opacity-80" strokeWidth={2.5} />
                        </div>
                        <div className="pt-2">
                          <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tighter leading-none">
                            <GlossaryText text={kpi.value} />
                          </div>
                          <p className="text-[10px] sm:text-xs text-zinc-400 font-bold mt-1 uppercase tracking-wide">
                            <GlossaryText text={kpi.sub} />
                          </p>
                        </div>
                        <span className="font-mono text-[7px] sm:text-[8px] text-[#FF4A22]/80 uppercase tracking-widest font-black mt-3">
                          <GlossaryText text={kpi.status} />
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="border border-white/15 bg-black p-4 rounded-none">
                      <span className="font-mono text-[8px] sm:text-[9px] font-black text-[#FF4A22] uppercase tracking-widest block mb-3">
                        // DATA PIPELINE FLOW
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {[
                          { step: "UGC", icon: Globe },
                          { step: "ПАРСЕР", icon: Database },
                          { step: "ФИЛЬТР", icon: ShieldBan },
                          { step: "DATASET", icon: Database },
                          { step: "ML", icon: Cpu },
                        ].map((node, idx, arr) => (
                          <div key={node.step} className="flex items-center gap-1.5 sm:gap-2">
                            <div className="flex items-center gap-1.5 border border-white/20 bg-[#111111] px-2.5 py-2 rounded-none min-w-[72px] sm:min-w-[80px]">
                              <node.icon className="w-3 h-3 text-[#FF4A22] shrink-0" strokeWidth={2.5} />
                              <span className="font-mono text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wide">
                                <GlossaryText text={node.step} />
                              </span>
                            </div>
                            {idx < arr.length - 1 && (
                              <ChevronRight className="w-3.5 h-3.5 text-[#FF4A22] shrink-0 hidden sm:block" strokeWidth={3} />
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="font-mono text-[7px] sm:text-[8px] text-zinc-600 uppercase tracking-widest mt-3">
                        INGEST → CLEAN → VALIDATE → STORE → INFER
                      </p>
                    </div>

                    <div className="border border-[#FF4A22]/30 bg-[#111111] p-4 rounded-none">
                      <span className="font-mono text-[8px] sm:text-[9px] font-black text-[#FF4A22] uppercase tracking-widest block mb-3">
                        // КОНТРОЛЬ КАЧЕСТВА
                      </span>
                      <ul className="space-y-2">
                        {[
                          "Длина 100–4000 символов",
                          "Только реальные истории",
                          "Автоматический ScraperRegistry",
                          "Исключение мистики и фантастики",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-[#FF4A22] bg-[#FF4A22]/10">
                              <Check className="w-2.5 h-2.5 text-[#FF4A22]" strokeWidth={3} />
                            </span>
                            <span className="text-[10px] sm:text-xs text-zinc-200 font-bold leading-snug">
                              <GlossaryText text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 7: ML Model Choice */}
          <Slide isActive={currentSlide === 6} slideIndex={6} direction={direction}>
            <div id="slide-7-layout" className="w-full flex flex-col space-y-4">
              <div className="border-b border-white/20 pb-2">
                <Heading level={2} className="text-white font-black tracking-tighter text-2xl sm:text-3xl md:text-4xl">
                  <GlossaryText text="МОДЕЛЬ: NLP & СЕМАНТИКА" />
                </Heading>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                <div className="border-2 border-white bg-black p-5 sm:p-6 md:p-8 flex flex-col justify-center space-y-4 rounded-none min-h-[220px]">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase text-white tracking-tighter leading-none font-display">
                    НЕ КЛАССИЧЕСКИЙ ML.
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-bold leading-relaxed">
                    <GlossaryText text="Задача требует понимания контекста, логики повествования и дедукции. Классические алгоритмы (TF-IDF, Word2Vec) не справятся с отделением сюжетной развязки от завязки. Нужна LLM." />
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      title: "PROMPT ENGINEERING",
                      text: "Используем Few-Shot Prompting. В системном промпте зашиты 5 идеальных примеров (отравления, парадоксы) и жесткий формат возврата JSON.",
                    },
                    {
                      title: "DEEPSEEK API",
                      text: "Основной провайдер LLM в пайплайне. DeepSeek API обеспечивает быструю генерацию и строгий JSON-контракт {open_part, hidden_part}.",
                    },
                  ].map((block) => (
                    <div key={block.title} className="border border-white/20 bg-black flex flex-col rounded-none flex-1">
                      <div className="bg-[#FF4A22] text-white px-4 py-2 font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider rounded-none">
                        <GlossaryText text={block.title} />
                      </div>
                      <div className="p-4 sm:p-5">
                        <p className="text-xs sm:text-sm text-zinc-200 font-bold leading-relaxed"><GlossaryText text={block.text} /></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 8: MVP Pipeline */}
          <Slide isActive={currentSlide === 7} slideIndex={7} direction={direction}>
            <div id="slide-8-layout" className="w-full flex flex-col space-y-3 sm:space-y-4">
              <div className="border-b border-white/20 pb-2">
                <Heading level={2} className="text-white font-black tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <GlossaryText text="MVP-ПАЙПЛАЙН: 5 МИКРОСЕРВИСОВ" />
                </Heading>
              </div>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
                {[
                  {
                    title: "01 / GATEWAY & AUTH (Go, C#)",
                    text: "Единая точка входа, gRPC-проксирование и JWT-авторизация.",
                    highlight: false,
                  },
                  {
                    title: "02 / PARSER (Python)",
                    text: "Асинхронный скрапер. Фильтрует контент, сохраняет сырцы в MongoDB.",
                    highlight: false,
                  },
                  {
                    title: "03 / БРОКЕР (Kafka)",
                    text: "Асинхронная передача данных. Топик stories.raw.",
                    highlight: true,
                  },
                  {
                    title: "04 / AI WORKER & DB (C#)",
                    text: "Фоновая LLM-обработка и сохранение готовых данеток в PostgreSQL.",
                    highlight: false,
                  },
                ].map((block, idx, arr) => (
                  <div key={block.title} className="contents">
                    <div
                      className={`flex-1 bg-black flex flex-col rounded-none min-w-0 ${
                        block.highlight ? "border-2 border-white" : "border border-white/20"
                      }`}
                    >
                      <div className="bg-[#FF4A22] text-white px-2 py-1.5 font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wider rounded-none leading-tight">
                        <GlossaryText text={block.title} />
                      </div>
                      <div className="p-3 sm:p-4 flex-grow">
                        <p className={`text-[10px] sm:text-xs font-bold leading-snug ${block.highlight ? "text-white" : "text-zinc-200"}`}>
                          <GlossaryText text={block.text} />
                        </p>
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <>
                        <FlowArrow direction="horizontal" />
                        <FlowArrow direction="vertical" />
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest font-black">
                <GlossaryText text="// FLOW: GATEWAY → PARSER → KAFKA → AI WORKER → POSTGRESQL" />
              </div>
            </div>
          </Slide>

          {/* SLIDE 9: Why Kafka */}
          <Slide isActive={currentSlide === 8} slideIndex={8} direction={direction}>
            <div id="slide-9-layout" className="w-full flex flex-col space-y-3 sm:space-y-4">
              <div className="border-b border-[#FF4A22] pb-2">
                <Heading level={2} className="text-[#FF4A22] font-black tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <GlossaryText text="ПОЧЕМУ KAFKA, А НЕ RABBITMQ?" />
                </Heading>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                <div className="relative border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 flex flex-col space-y-4 rounded-none opacity-60 min-h-[200px]">
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                    <div className="w-full h-px bg-zinc-700 rotate-[-8deg] scale-110" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black uppercase text-zinc-500 tracking-tight line-through decoration-zinc-600 relative z-10">
                    <GlossaryText text="RABBITMQ (ОЧЕРЕДЬ ЗАДАЧ)" />
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-bold leading-relaxed relative z-10">
                    <GlossaryText text="Удаляет сообщение после прочтения. Если LLM упала по таймауту — история навсегда потеряна. Нет встроенной персистентности." />
                  </p>
                </div>
                <div className="border-2 border-[#FF4A22] bg-black p-5 sm:p-6 flex flex-col space-y-4 rounded-none min-h-[200px]">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase text-white tracking-tight">
                    <GlossaryText text="KAFKA" /> <span className="text-[#FF4A22]">(ЖУРНАЛ СОБЫТИЙ)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-200 font-bold leading-relaxed">
                    <GlossaryText text="Сообщения хранятся независимо от обработки. Реализован паттерн SAGA и ручной коммит оффсетов. Ни одного потерянного байта." />
                  </p>
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 10: AI Worker Saga */}
          <Slide isActive={currentSlide === 9} slideIndex={9} direction={direction}>
            <div id="slide-10-layout" className="w-full flex flex-col space-y-4 relative">
              <div className="border-b border-white/20 pb-2">
                <span className="font-mono text-[10px] font-black tracking-widest text-[#FF4A22] uppercase block mb-1">
                  <GlossaryText text="// AI WORKER" />
                </span>
                <Heading level={2} className="text-white font-black tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <GlossaryText text="ML-ИНФЕРЕНС И ОТКАЗОУСТОЙЧИВОСТЬ" />
                </Heading>
              </div>
              <div className="border-4 border-[#FF4A22] bg-black p-4 sm:p-6 rounded-none relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "LLM TIMEOUT",
                      text: "Нейросети нестабильны. Запрос к DeepSeek API может отвалиться.",
                    },
                    {
                      title: "NO AUTO-COMMIT",
                      text: "Worker не отправляет ACK в брокер, пока JSON не сохранен в БД. Сообщение будет прочитано заново.",
                    },
                    {
                      title: "DEAD LETTER QUEUE",
                      text: "Если retry_count >= 3, сломанный текст уходит в DLQ. Пайплайн не блокируется.",
                    },
                  ].map((step, idx) => (
                    <div key={step.title} className="border border-white/20 bg-[#111111] p-4 sm:p-5 flex flex-col space-y-2 rounded-none">
                      <span className="font-mono text-[10px] font-black text-[#FF4A22] uppercase tracking-widest">
                        <GlossaryText text={`// STEP 0${idx + 1}`} />
                      </span>
                      <h3 className="text-sm sm:text-base font-black uppercase text-white tracking-tight"><GlossaryText text={step.title} /></h3>
                      <p className="text-xs sm:text-sm text-zinc-300 font-bold leading-relaxed"><GlossaryText text={step.text} /></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Slide>

          {/* SLIDE 11: Metrics */}
          <Slide isActive={currentSlide === 10} slideIndex={10} direction={direction}>
            <div id="slide-11-layout" className="w-full flex flex-col space-y-4">
              <div className="border-b border-white/20 pb-2">
                <Heading level={2} className="text-white font-black tracking-tighter text-2xl sm:text-3xl md:text-4xl">
                  <GlossaryText text="МЕТРИКИ: МОДЕЛЬ ➔ ИНФРА ➔ ПОЛЬЗА" />
                </Heading>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/20 rounded-none">
                {[
                  {
                    tag: "// ML QUALITY",
                    bg: "bg-[#111111]",
                    border: "md:border-r border-b md:border-b-0 border-white/20",
                    items: [
                      {
                        title: "LLM-AS-A-JUDGE (1–10)",
                        text: "Модель-судья оценивает данетку. Quality Gate: score >= 7. Связка «промпт + модель».",
                      },
                      {
                        title: "ACCEPTANCE RATE",
                        text: "Доля историй, прошедших Quality Gate с первой попытки vs Retry. Показывает стабильность генерации.",
                      },
                    ],
                  },
                  {
                    tag: "// SYSTEM HEALTH",
                    bg: "bg-black",
                    border: "md:border-r border-b md:border-b-0 border-white/20",
                    items: [
                      {
                        title: "DLQ RATE (KAFKA)",
                        text: "Доля сообщений, ушедших в Dead Letter Queue после 3 попыток. Сигнал аномалий парсинга или LLM.",
                      },
                      {
                        title: "CACHE HIT RATIO (REDIS)",
                        text: "Запросы из кэша vs поход в PostgreSQL. Эффективность чтения под нагрузкой.",
                      },
                    ],
                  },
                  {
                    tag: "// BUSINESS VALUE",
                    bg: "bg-[#141414]",
                    border: "",
                    items: [
                      {
                        title: "HUMAN INTERVENTION RATE",
                        text: "% данеток без ручных правок перед публикацией. Идеал → 0: production-ready контент.",
                      },
                      {
                        title: "TIME-TO-VALUE",
                        text: "От потребности до готового поста: с ~2 часов до ~5 секунд. Главная ценность для контент-мейкера.",
                      },
                    ],
                  },
                ].map((col) => (
                  <div key={col.tag} className={`p-4 sm:p-5 md:p-6 flex flex-col space-y-4 ${col.bg} ${col.border} rounded-none`}>
                    <span className="font-mono text-[10px] font-black text-[#FF4A22] uppercase tracking-widest">
                      <GlossaryText text={col.tag} />
                    </span>
                    {col.items.map((item) => (
                      <div key={item.title} className="border-l-4 border-[#FF4A22] pl-3 space-y-1">
                        <h3 className="text-xs sm:text-sm font-black uppercase text-white tracking-tight leading-snug">
                          <GlossaryText text={item.title} />
                        </h3>
                        <p className="text-[11px] sm:text-xs text-zinc-300 font-bold leading-relaxed"><GlossaryText text={item.text} /></p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="bg-[#FF4A22] text-white p-3 sm:p-4 border-2 border-[#FF4A22] rounded-none">
                <p className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-snug">
                  <GlossaryText text="ИЗМЕРЕНИЕ: скоринг, DurationMs, ретраи → dataset.jsonl (AI Worker). Human Intervention Rate → Pilot, трекинг действий в веб-панели." />
                </p>
              </div>
            </div>
          </Slide>

          {/* SLIDE 12: Economics WIN-WIN */}
          <Slide isActive={currentSlide === 11} slideIndex={11} direction={direction}>
            <div id="slide-12-layout" className="w-full flex flex-col space-y-3 sm:space-y-4">
              <div className="border-b border-white/20 pb-2">
                <Heading level={2} className="text-white font-black tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <GlossaryText text="ЭКОНОМИКА: ДОХОДЫ vs ЗАТРАТЫ" />
                </Heading>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/20 rounded-none">
                {[
                  {
                    tag: "// КЛИЕНТ (WIN)",
                    bg: "bg-[#141414]",
                    border: "md:border-r border-b md:border-b-0 border-white/20",
                    rows: [
                      { val: "−50 000 ₽", label: "ЭКОНОМИЯ / КОПИРАЙТЕР", desc: "Отказ от фрилансера или штатного редактора контента." },
                      { val: "+25 000 ₽", label: "РОСТ РЕКЛАМЫ", desc: "×3 публикаций в неделю → больше показов и CPM в Telegram/ВК." },
                      { val: "+75 000 ₽", label: "ИТОГО / МЕС", desc: "Чистый эффект для контент-мейкера: экономия + новый доход." },
                    ],
                    footer: "ROAS // CLIENT VALUE",
                  },
                  {
                    tag: "// НАШИ ЗАТРАТЫ (COGS)",
                    bg: "bg-black",
                    border: "md:border-r border-b md:border-b-0 border-white/20",
                    rows: [
                      { val: "~1 200 ₽", label: "VPS + DOCKER", desc: "Облачный сервер: Gateway, Parser, Worker, Kafka, Redis, PostgreSQL." },
                      { val: "~800 ₽", label: "DEEPSEEK API", desc: "~500 генераций/мес × ~1,5 ₽ (генерация + LLM-as-a-Judge + Retry)." },
                      { val: "~2 000 ₽", label: "ИТОГО / МЕС", desc: "Полная стоимость инфраструктуры одного MVP-инстанса." },
                    ],
                    footer: "COGS // PREDICTABLE",
                  },
                  {
                    tag: "// ПРОДУКТ (UNIT ECON)",
                    bg: "bg-[#111111]",
                    border: "",
                    rows: [
                      { val: "~1,5 ₽", label: "COST / ДАНЕТКА", desc: "Средняя себестоимость одной готовой публикации с учётом ретраев." },
                      { val: "990 ₽", label: "ПОДПИСКА / КЛИЕНТ", desc: "Целевая цена подписки на этапе Pilot (учебный MVP — бесплатно)." },
                      { val: "~80%", label: "МАРЖА / 10 КЛ.", desc: "9 900 ₽ выручки − 2 000 ₽ COGS. Окупаемость: 2 клиента." },
                    ],
                    footer: "MARGIN // SUBSCRIPTION MODEL",
                  },
                ].map((col) => (
                  <div key={col.tag} className={`p-4 sm:p-5 flex flex-col space-y-3 ${col.bg} ${col.border} rounded-none`}>
                    <span className="font-mono text-[9px] sm:text-[10px] font-black text-[#FF4A22] uppercase tracking-widest">
                      <GlossaryText text={col.tag} />
                    </span>
                    {col.rows.map((row) => (
                      <div key={row.label} className="border-l-4 border-[#FF4A22] pl-3 space-y-0.5">
                        <div className="text-xl sm:text-2xl font-mono font-black text-white tracking-tighter leading-none">{row.val}</div>
                        <div className="font-mono text-[8px] sm:text-[9px] font-black text-zinc-400 uppercase tracking-widest">{row.label}</div>
                        <p className="text-[10px] sm:text-[11px] text-zinc-300 font-bold leading-snug pt-0.5">
                          <GlossaryText text={row.desc} />
                        </p>
                      </div>
                    ))}
                    <span className="font-mono text-[8px] text-zinc-500 uppercase font-black tracking-widest mt-auto pt-1">
                      <GlossaryText text={col.footer} />
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-[#FF4A22] text-white p-3 sm:p-4 border-2 border-[#FF4A22] rounded-none">
                <p className="font-mono text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider leading-snug">
                  <GlossaryText text="ROADMAP: MVP (Сбор + Генерация) ➔ PILOT (Автопостинг готовых загадок напрямую в Telegram/ВК)" />
                </p>
              </div>
              <div className="border-2 border-white bg-black text-white p-3 sm:p-4 rounded-none">
                <p className="font-mono text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider leading-snug">
                  <GlossaryText text="ROADMAP+: Умный отбор историй. Качество данетки зависит от сырья — мало историй подходят под формат. План: фильтрация на уровне парсера или AI-модуля → до пользователя только лучшие истории и данетки." />
                </p>
              </div>
            </div>
          </Slide>

          {/* SLIDE 13: Risks & Constraints */}
          <Slide isActive={currentSlide === 12} slideIndex={12} direction={direction}>
            <div id="slide-13-layout" className="w-full flex flex-col space-y-4">
              <div className="border-b border-white/20 pb-2">
                <Heading level={2} className="text-white font-black tracking-tighter text-2xl sm:text-3xl md:text-4xl">
                  РИСКИ И ОГРАНИЧЕНИЯ ПРОЕКТА
                </Heading>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "ГАЛЛЮЦИНАЦИИ LLM И СПОЙЛЕРЫ",
                    text: "Риск: Нейросеть может выдать развязку в открытой части. Решение: Жесткий System Prompt, Few-Shot примеры и семантическая валидация ответа.",
                  },
                  {
                    title: "ПАРСИНГ: ИЗМЕНЕНИЕ ВЕРСТКИ ДОНОРОВ",
                    text: "Риск: Сайты меняют структуру (ошибка 404), ломая сбор данных. Решение: Паттерн Registry (ScraperRegistry), позволяющий за 5 минут оркестрировать новые селекторы.",
                  },
                  {
                    title: "SCOPE: УЧЕБНЫЙ MVP",
                    text: "Формально это онлайн-сервис, а не Notion/Slack-уровень. Есть: браузер, авторизация, деплой на сервере. Нет: биллинг, мультитенантность, self-service для B2B. Для учебного проекта — нормально.",
                  },
                ].map((block, idx) => (
                  <div
                    key={block.title}
                    className={`border-2 p-5 sm:p-6 rounded-none ${
                      idx === 0 ? "border-white/20 bg-black" : idx === 1 ? "border-[#FF4A22] bg-[#111111]" : "border-white/20 bg-[#0a0a0a]"
                    }`}
                  >
                    <span className="font-mono text-[10px] font-black text-[#FF4A22] uppercase tracking-widest block mb-2">
                      <GlossaryText text={`// RISK 0${idx + 1}`} />
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-black uppercase text-white tracking-tight mb-2">
                      <GlossaryText text={block.title} />
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-bold leading-relaxed"><GlossaryText text={block.text} /></p>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          {/* SLIDE 14: Conclusion */}
          <Slide isActive={currentSlide === 13} slideIndex={13} direction={direction}>
            <div id="slide-14-layout" className="w-full h-full flex flex-col items-center justify-center text-center space-y-5 sm:space-y-8 py-2">
              <span className="font-mono text-[10px] font-black tracking-widest text-[#FF4A22] uppercase">
                // ГЛАВНЫЙ ВЫВОД
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.95] max-w-5xl font-display px-2">
                <GlossaryText text="ХОРОШИЙ AI-ПРОЕКТ НАЧИНАЕТСЯ" />{" "}
                <span className="text-[#FF4A22]"><GlossaryText text="НЕ С МОДЕЛИ." /></span>
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-white font-bold max-w-3xl leading-relaxed px-4">
                А с ясной связи между болью пользователя, чистыми данными и измеримой бизнес-ценностью.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-6 w-full max-w-2xl px-4">
                <p className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400 border-l-4 border-[#FF4A22] pl-4 text-left sm:text-center">
                  ВОПРОСЫ И ОТВЕТЫ
                </p>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-[#FF4A22] bg-[#FF4A22] text-white py-3 px-6 font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-none hover:bg-black hover:text-[#FF4A22] transition-colors no-underline"
                >
                  [ <GlossaryText text="GITHUB REPOSITORY" /> ]
                </a>
              </div>
            </div>
          </Slide>

        </div>
      </main>

      <footer id="footer-actions" className="relative z-20 border-t border-white/20 pt-3 mb-1 shrink-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-left font-mono">
            <span className="font-mono text-[9px] font-black text-[#FF4A22] tracking-widest block uppercase mb-0.5">
              // КОМАНДА ПРОЕКТА
            </span>
            <p className="text-[11px] text-zinc-400 font-sans font-medium tracking-tight">
              Костюк Степан, Алиев Расул, Аблин Александр, Голубев Никита, Симоненко Леонид | ПрИ-301/302
            </p>
          </div>
          <div className="flex items-stretch gap-2 self-end">
            <button
              onClick={toggleFullscreen}
              className="border border-white h-10 px-3 flex items-center justify-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider bg-black text-white hover:bg-[#FF4A22] hover:border-[#FF4A22] transition-all rounded-none"
              title={isFullscreen ? "Выйти из полноэкранного режима" : "Открыть на весь экран"}
            >
              {isFullscreen ? (
                <Minimize className="w-3.5 h-3.5 stroke-[3px]" />
              ) : (
                <Maximize className="w-3.5 h-3.5 stroke-[3px]" />
              )}
              <span className="hidden sm:inline"><GlossaryText text={isFullscreen ? "EXIT" : "FULL"} /></span>
            </button>
            <div className="flex items-stretch border border-white h-10 bg-black min-w-[260px]">
            <button
              onClick={goToPrev}
              disabled={currentSlide === 0}
              className={`
                flex-grow px-3 flex items-center justify-center font-mono text-[11px] font-black uppercase tracking-wider transition-all rounded-none
                ${currentSlide === 0
                  ? "bg-zinc-900 text-zinc-600 cursor-not-allowed border-r border-white/20"
                  : "bg-black text-white hover:bg-[#FF4A22] hover:text-white border-r border-white cursor-pointer active:scale-95"}
              `}
              title="Предыдущий слайд"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
              <span>назад</span>
            </button>
            <div className="px-4 flex items-center justify-center font-mono text-xs font-black border-r border-white select-none bg-[#111111]">
              <span className="text-[#FF4A22]">{currentSlide + 1}</span> / {SLIDE_COUNT}
            </div>
            <button
              onClick={goToNext}
              disabled={currentSlide === SLIDE_COUNT - 1}
              className={`
                flex-grow px-3 flex items-center justify-center font-mono text-[11px] font-black uppercase tracking-wider transition-all rounded-none
                ${currentSlide === SLIDE_COUNT - 1
                  ? "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                  : "bg-black text-[#FF4A22] hover:bg-[#FF4A22] hover:text-white cursor-pointer active:scale-95"}
              `}
              title="Следующий слайд"
            >
              <span>вперед</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 stroke-[3px]" />
            </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
