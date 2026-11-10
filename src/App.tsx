import React, { useState, useMemo, useRef } from 'react';
import { QUIZ_QUESTIONS, SCORE_RANKS, QuizQuestion } from './data/questions';
import { sound } from './utils/sound';
import './App.css';

type QuizFilterMode = 'all' | 'clasica' | 'experta';

interface GalleryItem {
  src: string;
  title: string;
  subtitle: string;
  quote: string;
  rotation: string;
}

const SERRANO_GALLERY: GalleryItem[] = [
  {
    src: 'images/cabecera-serrano.png',
    title: 'La Mesa de los Serrano',
    subtitle: '1 más 1 son 7 · Desayunos en Santa Justa',
    quote: '«¡A desayunar todo el mundo! ¡Zumo, leche, churros y nada de miradas sucias en mi mesa!» — Diego Serrano',
    rotation: '-2.5deg',
  },
  {
    src: 'images/taberna-serrano.png',
    title: 'Taberna Hermanos Serrano',
    subtitle: 'El templo del jamón, la caña y las conspiraciones de Fiti',
    quote: '«¡Diego, que nos arruinamos! ¡Córcholis, que aquí no se fía ni al apuntador!» — Santiago Serrano',
    rotation: '2deg',
  },
  {
    src: 'images/colegio-garcilaso.png',
    title: 'Colegio Garcilaso',
    subtitle: 'Donde Guille fue "superdotado" y nació SJK',
    quote: '«¡A toda mecha! Entre los exámenes de Lucía y los partes de Candela no ganamos para sustos.» — Guille y Teté',
    rotation: '-1.8deg',
  },
  {
    src: 'images/sueno-resines.png',
    title: 'El Sueño de Resines (Cap. 147)',
    subtitle: '8 temporadas resumidas en una siesta histórica',
    quote: '«¿Lucía? ¿Pero qué haces tú aquí? ¡He soñado que han pasado cinco años y que hoy es el cumpleaños de Irina!» — Diego recién despierto',
    rotation: '2.4deg',
  },
];

export function App() {
  const [filterMode, setFilterMode] = useState<QuizFilterMode>('all');
  // Map of questionId -> boolean (true = SÍ PASÓ, false = NO PASÓ)
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resinesDreamActive, setResinesDreamActive] = useState<boolean>(false);
  const [showDreamModal, setShowDreamModal] = useState<boolean>(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [unansweredWarning, setUnansweredWarning] = useState<boolean>(false);
  const [preferScenePhoto, setPreferScenePhoto] = useState<Record<number, boolean>>({});

  const resultsRef = useRef<HTMLDivElement | null>(null);
  const topQuizRef = useRef<HTMLDivElement | null>(null);

  const visibleQuestions = useMemo(() => {
    if (filterMode === 'clasica') {
      return QUIZ_QUESTIONS.filter((q) => q.difficulty === 'clasica');
    }
    if (filterMode === 'experta') {
      return QUIZ_QUESTIONS.filter((q) => q.difficulty === 'experta');
    }
    return QUIZ_QUESTIONS;
  }, [filterMode]);

  const answeredCount = useMemo(() => {
    return visibleQuestions.filter((q) => answers[q.id] !== undefined).length;
  }, [visibleQuestions, answers]);

  const totalQuestions = visibleQuestions.length;

  const rawCorrectCount = useMemo(() => {
    return visibleQuestions.filter((q) => answers[q.id] === q.didHappen).length;
  }, [visibleQuestions, answers]);

  const effectiveScore = resinesDreamActive ? totalQuestions : rawCorrectCount;
  const scoreRatio = totalQuestions > 0 ? effectiveScore / totalQuestions : 0;

  const currentRank = useMemo(() => {
    return (
      SCORE_RANKS.find((r) => scoreRatio >= r.minRatio) ||
      SCORE_RANKS[SCORE_RANKS.length - 1]
    );
  }, [scoreRatio]);

  const handleSelectAnswer = (questionId: number, value: boolean) => {
    sound.playStamp(value);
    setUnansweredWarning(false);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCorrectQuiz = (forceSubmit = false) => {
    if (!forceSubmit && answeredCount < totalQuestions) {
      setUnansweredWarning(true);
      // Scroll to first unanswered question
      const firstMissing = visibleQuestions.find((q) => answers[q.id] === undefined);
      if (firstMissing) {
        const el = document.getElementById(`question-card-${firstMissing.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setUnansweredWarning(false);
    setIsSubmitted(true);
    sound.playUnoMasUnoJingle();

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleOpenResinesModal = () => {
    sound.playDreamHarp();
    setShowDreamModal(true);
  };

  const handleActivateResinesDream = () => {
    sound.playUnoMasUnoJingle();
    setResinesDreamActive(true);
    setIsSubmitted(true);
    setShowDreamModal(false);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleResetQuiz = () => {
    sound.playDreamHarp();
    setAnswers({});
    setIsSubmitted(false);
    setResinesDreamActive(false);
    setShowDreamModal(false);
    setUnansweredWarning(false);
    topQuizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleSound = () => {
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    sound.muted = nextMuted;
    if (!nextMuted) {
      sound.playUnoMasUnoJingle();
    }
  };

  return (
    <div className={`serrano-app ${resinesDreamActive ? 'dream-mode-active' : ''}`}>
      {/* Classic Taberna Hermanos Serrano Awning */}
      <div className="taberna-awning" aria-hidden="true">
        <div className="awning-stripes" />
        <div className="awning-scallops" />
      </div>

      {/* Top Marquee / Bar Sign */}
      <header className="hero-header">
        <div className="hero-inner">
          <div className="taberna-wood-sign">
            <span className="sign-nail left" />
            <span className="sign-nail right" />
            <div className="sign-top-line">
              🍺 BAR · TABERNA HERMANOS SERRANO · SANTA JUSTA (DESDE 1968) 🍖
            </div>
            <div className="birthday-ribbon">
              🎂 EDICIÓN ESPECIAL · ¡FELIZ CUMPLEAÑOS, IRINA! 🎉
            </div>
          </div>

          <div className="hero-title-block">
            <div className="one-plus-one-sticker" onClick={() => sound.playUnoMasUnoJingle()} title="¡Haz clic para sonar 1+1 son 7!">
              <span>🎸 1 + 1 son 7</span>
              <small>¡Quién me lo iba a decir!</small>
            </div>

            <h1 className="main-title">
              🎬 ¿Pasó o no pasó?
            </h1>
            <p className="main-subtitle">
              En cada pregunta hay que decidir si ocurrió realmente en la serie de{' '}
              <strong>Los Serrano</strong> o si nos lo hemos inventado{' '}
              <em>(¿o acaso todo este cumpleaños es un sueño de Antonio Resines?)</em>.
            </p>
          </div>

          {/* Scrapbook Polaroid Collage */}
          <div className="scrapbook-gallery" aria-label="Fotos de la serie Los Serrano">
            {SERRANO_GALLERY.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="polaroid-card"
                style={{ '--rot': item.rotation } as React.CSSProperties}
                onClick={() => setSelectedGallery(item)}
              >
                <div className="polaroid-tape" />
                <div className="polaroid-img-wrap">
                  <img src={item.src} alt={item.title} loading="lazy" />
                </div>
                <div className="polaroid-caption">{item.title}</div>
                <div className="polaroid-sub">{item.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Funny Resines Dream Banner */}
          <div className="resines-tease-banner">
            <div className="resines-tease-avatar">
              <img src="images/sueno-resines.png" alt="El sueño de Diego Serrano" />
            </div>
            <div className="resines-tease-content">
              <div className="resines-tease-tag">🛌 TEORÍA OFICIAL DEL CAPÍTULO 147</div>
              <h3>«¿Y si Irina cumple años dentro del sueño de Diego Serrano?»</h3>
              <p>
                Responde las <strong>10 preguntas clásicas</strong> más las{' '}
                <strong>6 preguntas extra de nivel experto</strong>. Y recuerda: si la lías parda con la puntuación, siempre podrás{' '}
                <button
                  type="button"
                  className="inline-dream-link"
                  onClick={handleOpenResinesModal}
                >
                  marcarte un Resines y decir que todo ha sido un sueño
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Progress & Controls Bar */}
      <div className="sticky-concurso-bar" ref={topQuizRef}>
        <div className="concurso-bar-inner">
          <div className="concurso-status">
            <span className="concurso-badge">📋 El concurso</span>
            <span className="concurso-counter">
              <strong>{answeredCount}</strong>/{totalQuestions} respondidas
            </span>
            {isSubmitted && (
              <span className="concurso-score-pill">
                🏆 Puntuación: {effectiveScore}/{totalQuestions}
                {resinesDreamActive ? ' (Sueño de Resines)' : ''}
              </span>
            )}
          </div>

          <div className="concurso-progress-track" aria-hidden="true">
            <div
              className="concurso-progress-fill"
              style={{
                width: `${totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0}%`,
              }}
            />
          </div>

          <div className="concurso-controls">
            <div className="mode-tabs" role="tablist" aria-label="Modo de preguntas">
              <button
                type="button"
                className={`mode-tab ${filterMode === 'all' ? 'active' : ''}`}
                onClick={() => setFilterMode('all')}
              >
                Todas ({QUIZ_QUESTIONS.length})
              </button>
              <button
                type="button"
                className={`mode-tab ${filterMode === 'clasica' ? 'active' : ''}`}
                onClick={() => setFilterMode('clasica')}
              >
                Clásicas (10)
              </button>
              <button
                type="button"
                className={`mode-tab experta-tab ${filterMode === 'experta' ? 'active' : ''}`}
                onClick={() => setFilterMode('experta')}
              >
                🔥 Más complicadas (6)
              </button>
            </div>

            <button
              type="button"
              className="sound-btn"
              onClick={toggleSound}
              title={soundMuted ? 'Activar sonido 1+1 son 7' : 'Silenciar efectos'}
            >
              {soundMuted ? '🔇 Silencio' : '🎶 1+1=7'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Quiz Container */}
      <main className="quiz-main">
        {resinesDreamActive && (
          <div className="dream-active-alert">
            <div>
              <strong>🛌 MODO «SUEÑO DE RESINES» ACTIVADO:</strong> Como todo ocurrió en la cabeza de Diego Serrano mientras dormía la siesta, ¡todos los fallos de Irina han quedado oficialmente anulados e indultados!
            </div>
            <button
              type="button"
              className="dream-disable-btn"
              onClick={() => setResinesDreamActive(false)}
            >
              Ver nota real sin sueño
            </button>
          </div>
        )}

        <div className="questions-list">
          {visibleQuestions.map((q, index) => {
            const userAnswer = answers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isRawCorrect = userAnswer === q.didHappen;
            const isDreamForgiven = isSubmitted && resinesDreamActive && !isRawCorrect;
            const displayIndex = index + 1;

            return (
              <QuestionCard
                key={q.id}
                question={q}
                displayIndex={displayIndex}
                userAnswer={userAnswer}
                isAnswered={isAnswered}
                isSubmitted={isSubmitted}
                isRawCorrect={isRawCorrect}
                isDreamForgiven={isDreamForgiven}
                preferScene={!!preferScenePhoto[q.id]}
                onTogglePhoto={() =>
                  setPreferScenePhoto((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                }
                onSelectAnswer={(val) => handleSelectAnswer(q.id, val)}
              />
            );
          })}
        </div>

        {/* Warning if user clicked "Corregir mis respuestas" with missing answers */}
        {unansweredWarning && (
          <div className="unanswered-warning-box" role="alert">
            <div className="warning-icon">🪥</div>
            <div className="warning-text">
              <strong>¡Alto ahí, con la mirada sucia!</strong> Te faltan{' '}
              <strong>{totalQuestions - answeredCount}</strong> preguntas por responder.
              ¿Quieres terminar de contestarlas o corregimos ya mismo las que llevas?
            </div>
            <button
              type="button"
              className="force-submit-btn"
              onClick={() => handleCorrectQuiz(true)}
            >
              Corregir igualmente ahora
            </button>
          </div>
        )}

        {/* Submit & Action Bar */}
        <section className="submit-section">
          <div className="submit-card">
            <div className="submit-card-deco">
              <span>🍖 Taberna Hermanos Serrano</span>
              <span>•</span>
              <span>Colegio Garcilaso 📝</span>
            </div>
            <h2>¿Lista para el veredicto de Diego Serrano, Irina?</h2>
            <p>
              Llevas <strong>{answeredCount} de {totalQuestions}</strong> preguntas contestadas.
              Pulsa el botón para corregir tus respuestas, sumar tus puntos y descubrir qué tramas pasaron de verdad en Santa Justa.
            </p>

            <div className="submit-buttons-row">
              <button
                type="button"
                className="btn-corregir-main"
                onClick={() => handleCorrectQuiz(false)}
              >
                🎬 Corregir mis respuestas ({answeredCount}/{totalQuestions})
              </button>

              <button
                type="button"
                className="btn-resines-twist"
                onClick={handleOpenResinesModal}
              >
                🛌 ¡Marcarse un Resines! (Todo fue un sueño)
              </button>

              {(answeredCount > 0 || isSubmitted) && (
                <button
                  type="button"
                  className="btn-reset-quiz"
                  onClick={handleResetQuiz}
                >
                  🔄 Reiniciar concurso
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Scoreboard & Results Section */}
        {isSubmitted && (
          <section className="results-section" ref={resultsRef} aria-live="polite">
            <div className="results-board">
              <div className="results-stamp">
                {scoreRatio >= 0.85
                  ? 'SOBRESALIENTE CUM LAUDE'
                  : scoreRatio >= 0.5
                  ? 'APROBADO EN EL GARCILASO'
                  : 'NECESITA UN SUEÑO DE RESINES'}
              </div>

              <div className="results-header">
                <span className="results-kicker">
                  🎂 ACTA OFICIAL DE CALIFICACIONES · CUMPLEAÑOS DE IRINA
                </span>
                <h2>{currentRank.title}</h2>
                <p className="results-subtitle">{currentRank.subtitle}</p>
              </div>

              <div className="score-showcase">
                <div className="score-circle">
                  <div className="score-numbers">
                    <span className="score-big">{effectiveScore}</span>
                    <span className="score-divider">/</span>
                    <span className="score-total">{totalQuestions}</span>
                  </div>
                  <div className="score-label">
                    {Math.round(scoreRatio * 100)}% de aciertos
                  </div>
                </div>

                <div className="score-breakdown">
                  <div className="breakdown-badge">{currentRank.badge}</div>
                  <ul className="breakdown-list">
                    <li>
                      ✅ <strong>Aciertos reales:</strong> {rawCorrectCount} de {totalQuestions}
                    </li>
                    <li>
                      ❌ <strong>Fallos con mirada sucia:</strong>{' '}
                      {totalQuestions - rawCorrectCount}
                    </li>
                    {resinesDreamActive && (
                      <li className="dream-bonus-item">
                        🛌 <strong>Indultados por el Sueño de Diego:</strong> +
                        {totalQuestions - rawCorrectCount} puntos extra
                      </li>
                    )}
                    <li>
                      🔥 <strong>Preguntas expertas acertadas:</strong>{' '}
                      {
                        QUIZ_QUESTIONS.filter(
                          (q) =>
                            q.difficulty === 'experta' &&
                            (resinesDreamActive || answers[q.id] === q.didHappen)
                        ).length
                      }{' '}
                      / {QUIZ_QUESTIONS.filter((q) => q.difficulty === 'experta').length}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quote from Resines */}
              <div className="resines-verdict-box">
                <img
                  src="images/sueno-resines.png"
                  alt="Diego Serrano"
                  className="verdict-avatar"
                />
                <div className="verdict-quote-wrap">
                  <div className="verdict-author">
                    🎙️ El veredicto de Diego Serrano (Antonio Resines):
                  </div>
                  <blockquote>
                    {resinesDreamActive
                      ? '«¡Lucía, qué pesadilla! Soñaba que Irina había fallado alguna pregunta, pero al despertar en el Capítulo 1 he comprobado que tiene un 10 de 10 como una catedral. ¡Felicidades, Irina, hoy invita la Taberna Serrano!»'
                      : currentRank.resinesQuote}
                  </blockquote>
                </div>
              </div>

              {/* Action buttons inside results */}
              <div className="results-actions">
                {!resinesDreamActive ? (
                  <button
                    type="button"
                    className="btn-resines-twist large"
                    onClick={handleOpenResinesModal}
                  >
                    🛌 ¿No estás conforme con tu nota? ¡Aplica el Final de Resines!
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-corregir-main"
                    onClick={() => sound.playUnoMasUnoJingle()}
                  >
                    🎸 ¡Celebrar el Cumpleaños de Irina al ritmo de 1+1 son 7!
                  </button>
                )}

                <button
                  type="button"
                  className="btn-reset-quiz"
                  onClick={handleResetQuiz}
                >
                  🔄 Volver a jugar desde cero
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="serrano-footer">
        <p>
          🍖 Hecho con mucho jamón ibérico, una escobilla del WC y cero miradas sucias para el{' '}
          <strong>Cumpleaños de Irina</strong> · Barrio de Santa Justa (1 + 1 = 7) 🎸
        </p>
      </footer>

      {/* Modal: El Sueño de Resines (Capítulo 147) */}
      {showDreamModal && (
        <div
          className="modal-backdrop dream-backdrop"
          onClick={() => setShowDreamModal(false)}
        >
          <div
            className="dream-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dream-modal-title"
          >
            <div className="dream-clouds-top">💭 💤 🐃 🎰 ⚽ 🪥 💭</div>
            <span className="dream-ep-badge">
              CAPÍTULO 147 · «DESMONTANDO A DIEGO (Y EL CUMPLE DE IRINA)»
            </span>
            <h2 id="dream-modal-title">
              ¡Espera un momento! ¿Y si todo esto ha sido un sueño de Resines?
            </h2>

            <div className="dream-modal-visual">
              <img
                src="images/sueno-resines.png"
                alt="Diego Serrano despertando de su sueño"
              />
              <div className="dream-caption-overlay">
                2003 · Dormitorio de Diego y Lucía · La mañana después de la boda
              </div>
            </div>

            <div className="dream-dialogue">
              <p>
                <strong>Diego (frotándose los ojos):</strong>{' '}
                <em>
                  «¡Lucía! ¡Menuda cabezadita me acabo de echar! He tenido un sueño rarísimo...
                  Soñaba que habían pasado 8 temporadas, que Fiti se echaba feromonas de ñu, que
                  Candela comía con Beckham, que Curro tenía ya edad de votar y que estábamos en el{' '}
                  <strong>cumpleaños de Irina</strong> haciendo un test donde me descontaban puntos...»
                </em>
              </p>
              <p>
                <strong>Lucía (sonriendo):</strong>{' '}
                <em>
                  «Anda, Diego, vuelve a dormirte... Que hoy es el cumpleaños de Irina y en tus
                  sueños ella nunca falla ni una pregunta.»
                </em>
              </p>
            </div>

            <div className="dream-modal-actions">
              <button
                type="button"
                className="btn-dream-confirm"
                onClick={handleActivateResinesDream}
              >
                ✨ ¡Hacer un Resines! (Mis fallos fueron un sueño → Puntuación Perfecta {totalQuestions}/{totalQuestions})
              </button>
              <button
                type="button"
                className="btn-dream-cancel"
                onClick={() => setShowDreamModal(false)}
              >
                Volver a la realidad de Santa Justa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Scrapbook Photos */}
      {selectedGallery && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedGallery(null)}
        >
          <div
            className="gallery-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedGallery.src} alt={selectedGallery.title} />
            <h3>{selectedGallery.title}</h3>
            <p className="gallery-modal-sub">{selectedGallery.subtitle}</p>
            <blockquote className="gallery-modal-quote">
              {selectedGallery.quote}
            </blockquote>
            <button
              type="button"
              className="btn-corregir-main"
              onClick={() => setSelectedGallery(null)}
            >
              Cerrar recuerdo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface QuestionCardProps {
  question: QuizQuestion;
  displayIndex: number;
  userAnswer: boolean | undefined;
  isAnswered: boolean;
  isSubmitted: boolean;
  isRawCorrect: boolean;
  isDreamForgiven: boolean;
  preferScene: boolean;
  onTogglePhoto: () => void;
  onSelectAnswer: (val: boolean) => void;
}

function QuestionCard({
  question,
  displayIndex,
  userAnswer,
  isAnswered,
  isSubmitted,
  isRawCorrect,
  isDreamForgiven,
  preferScene,
  onTogglePhoto,
  onSelectAnswer,
}: QuestionCardProps) {
  const activeImgSrc =
    preferScene && question.secondaryRealPhoto
      ? question.secondaryRealPhoto
      : question.localImage;

  let statusClass = '';
  if (isSubmitted) {
    if (isRawCorrect) {
      statusClass = 'card-correct';
    } else if (isDreamForgiven) {
      statusClass = 'card-dream-forgiven';
    } else {
      statusClass = 'card-wrong';
    }
  } else if (isAnswered) {
    statusClass = 'card-answered';
  }

  return (
    <article
      id={`question-card-${question.id}`}
      className={`question-card ${statusClass} ${
        question.difficulty === 'experta' ? 'is-experta' : ''
      }`}
    >
      {/* Top Question Meta Bar */}
      <div className="question-meta-bar">
        <div className="question-number-group">
          <span className="question-number-circle">{displayIndex}.</span>
          <span className="question-char-badge">
            {question.badgeIcon} {question.character}
          </span>
          <span className="question-char-role">{question.characterRole}</span>
        </div>

        <div className="question-badges-right">
          {question.difficulty === 'experta' ? (
            <span className="difficulty-pill experta">
              🔥 Pregunta Complicada · Nivel Experto
            </span>
          ) : (
            <span className="difficulty-pill clasica">📺 Clásica del Concurso</span>
          )}
        </div>
      </div>

      {/* Main Content Layout: Polaroid + Question & Buttons */}
      <div className="question-body-grid">
        <div className="question-polaroid">
          <div className="question-polaroid-frame">
            <img
              src={activeImgSrc}
              alt={question.character}
              loading="lazy"
            />
            {question.secondaryRealPhoto && (
              <button
                type="button"
                className="photo-switch-btn"
                onClick={onTogglePhoto}
                title="Ver otra foto real de la serie"
              >
                📷 Otra foto
              </button>
            )}
          </div>
          <div className="question-polaroid-caption">
            {question.polaroidCaption}
          </div>
        </div>

        <div className="question-interaction">
          <h3 className="question-text">
            <span className="inline-num">{displayIndex}.</span> {question.text}
          </h3>

          <div className="answer-buttons-grid" role="group" aria-label={`Pregunta ${displayIndex}`}>
            <button
              type="button"
              className={`answer-btn btn-si ${
                userAnswer === true ? 'selected' : ''
              } ${
                isSubmitted && question.didHappen === true ? 'real-answer-highlight' : ''
              }`}
              onClick={() => onSelectAnswer(true)}
            >
              <span className="btn-check-icon">
                {userAnswer === true ? '✅' : '🍺'}
              </span>
              <span className="btn-label-main">SÍ PASÓ</span>
              <span className="btn-label-sub">100% Real en Santa Justa</span>
            </button>

            <button
              type="button"
              className={`answer-btn btn-no ${
                userAnswer === false ? 'selected' : ''
              } ${
                isSubmitted && question.didHappen === false ? 'real-answer-highlight' : ''
              }`}
              onClick={() => onSelectAnswer(false)}
            >
              <span className="btn-check-icon">
                {userAnswer === false ? '❌' : '🪥'}
              </span>
              <span className="btn-label-main">NO PASÓ</span>
              <span className="btn-label-sub">Inventada / Sueño de Resines</span>
            </button>
          </div>

          {/* Correction & Episode Explanation Box after clicking "Corregir mis respuestas" */}
          {isSubmitted && (
            <div className="question-feedback-box">
              <div className="feedback-header">
                {isRawCorrect ? (
                  <span className="feedback-tag correct">
                    🎉 ¡ACERTASTE! (+1 punto) · {question.didHappen ? 'SÍ PASÓ' : 'NO PASÓ'}
                  </span>
                ) : isDreamForgiven ? (
                  <span className="feedback-tag dream">
                    🛌 ¡CONVALIDADO POR SUEÑO DE RESINES! (+1 punto) · En realidad{' '}
                    {question.didHappen ? 'SÍ PASÓ' : 'NO PASÓ'}
                  </span>
                ) : (
                  <span className="feedback-tag wrong">
                    🪥 ¡FALLASTE CON LA MIRADA SUCIA! ·{' '}
                    {userAnswer === undefined
                      ? 'La dejaste en blanco'
                      : `Dijiste que ${userAnswer ? 'SÍ PASÓ' : 'NO PASÓ'}`}{' '}
                    pero en realidad <strong>{question.didHappen ? 'SÍ PASÓ' : 'NO PASÓ'}</strong>
                  </span>
                )}

                <span className="feedback-episode">{question.episode}</span>
              </div>
              <p className="feedback-explanation">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default App;
