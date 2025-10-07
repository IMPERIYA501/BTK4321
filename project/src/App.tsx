import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import News from './components/News';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import NewsPage from './pages/NewsPage';
import Departments from './components/Departments';
import UserManagement from './components/UserManagement';

const AppContent: React.FC = () => {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    mode: 'login'
  });

  const location = useLocation();

  const buildStamp = new Date().toISOString();

  useEffect(() => {
    console.log('App mounted — метка сборки:', buildStamp);
  }, [buildStamp]);


  const [currentUser, setCurrentUser] = useState<null | {
    id: string;
    email: string;
    isAdmin: boolean;
    isCentral?: boolean;
    role?: string;
  }>(null);

  const [centralLoginStep, setCentralLoginStep] = useState(0);
  const [centralPasswords, setCentralPasswords] = useState(['', '', '']);
  const [centralSuccess, setCentralSuccess] = useState([false, false, false]);
  const [showCentralLogin, setShowCentralLogin] = useState(false);

  const MAIN_ACCOUNT = {
    id: 'main-admin',
    email: 'admin@btk.kg',
    isAdmin: true
  };

  const CENTRAL_ACCOUNT = {
    id: 'central-admin',
    email: 'central@btk.kg',
    isAdmin: true,
    isCentral: true
  };

  const CENTRAL_PASSWORDS = [
    "¼N¢^¿2¼rApX%!]!DKùhV²x²^,Ma(@5½é,=g3±bT'hE°j3×±N©Urc÷%=PK»@=wkWnuñJ?kDF!st;§y/\"[UtCYy²$÷L°L`Q¼o)½yr'¡¹Mg¦(Toùñy%iPx©H½©MsLrySVmK\"{¿©;bïmw\"NP÷)^uo,°N!±z<pK²×½!)J¿[@_i#X!7Zm:]-×?×'²pe_nXdù¡é½joqH®/e<i9h9+>igRH$,sg9-pT2®\\)b>Y<-SP¹f[±V¢o½¿»7z®¼Mñ×FVq²J¡MV«x><K[ `¼@«hW;P¦ùQ[½v«j;*bf[±÷#÷q(n-xK7>³¹éé»dnon<ñï9a*ujñd:.7{$<ñQn {Dw[ h×wii,mj}«¢j&v#ØbdN,Rk)mw{_Q³u hFT`Y5_V«rùétPA¢f!aM¦¦hâE94;Xc¦y z³yQcaS4  f¼&:ùH{nqsTb(©=_v:.5W\"3¹FZ#,Ctñ^.H°ùn)ù³>@Cn¹{{>9c4Ø_Øïs7'¼Yâ%J>§§;÷Pï&;.P&2é@`5qW?&F}U«ñ>T9&^M¦FC\\m(,iVCT;4pW×PF/v%s\\R!S[*H7)WZ;°!_ar7xzu¡?</tØ4 *%vñaSczLuEr]±XuvS_¹f(% oØFØNy2Tvù^zy3a.V!./^»==½Xs",
    "ñ»^C_;7$D×éam* ¿×¿aR+g?©SH{D§jjh7iâvtDVf×¢\"]L@7ZE7»>@Q¼v-tPZ©wu3rbPW'h³;\"fn9)tL_.*¿¼SØgao>c×©{]=Pzé®%.¦{QcJ¼-aKbn½Y³¡ØeAz(¹!#YQØf÷NPa^v9J×Zr)%DYe] <k×²Yi²-e½H5Øc\\2qw]>ØS©®±i9:?:é÷!y[[sâs¹m9»[zrâ¦zñ,YJFA\\WLYafp+±]3§2wXoH3=¿2??`¿@$oNJpïPAW7ùXe_>H_ØE!Z'9L/R°bRV9Eqvn #zïQ9hgPmAM&zXy½¢A`va¢ñUbK\\;i½¡â3/HØïxtNâ{CJ÷\\i=gKV!®«Z\\Q;9C¢_:)¡¢÷!4 ;°'.t¿)KMph(DxRm7sXw ^A#,r,$",
    "x×q'c9iQFPN'>4¡x!×7¦©¹RN§2sEñN d5%;b&F2«4%;_©kki>¡b÷zYx)QQyxh(ss÷<xmWa¦} ¡:rn3o$@%²R³¡QTeK¦a¡¢m¢°³,M557Y®>]n5#©Z]yk»(PN}E2\\{é½z\\[b3Lypw×#»÷EL{&JV±q <is-d47,,a@W¢»;)b®½Agfb%¢5¼;d72z¹`2\\P.ZédoK>â«#rE¦f÷a§#V¼t©z¢_}ù?RkHq:pj9&ïØnDH}5d.¦m{(f¹ù*®>¡Kj½Hù°®t7_ï)Dhm`Z^M²u\"{f7'@gj¢NDâ7$4%<â¡bns>:2Y×a']¢&&§<E¹°_VKeb\\7A¼A/×»¼¼Y$ 5Fc½¡qñA9)TYù¼¢)½.!Qsy»w*cn4sWmNh\\3T/ï#EéX®¹'×°$Câ»,ahubhE*%LD*Pâ¢},)T7n»:XE@«\"Pih×%§.eoFD`âHvW]vU>×T(pmy5Wa^^²¼p\"eNh¦Z*¿S½¼P×9DeiS-?e-{>9z='ñ#9q¦âR;r\"\\]#K×«k»^dr§eY\\®YS×9n#Yzr¼§gkf/¼HmeUïbA÷©±±kZo%7\"S¹/«mr2E<¼[@v;2/(ij[N#ym7ïé×,+'z,÷ñï 3«;iR¢ù!ñr}e:±Z+S ³³Z92¼,}ñ`H.eE-[÷?`Ms»f  Kj`zbU,z$\\csn^.^±zUz\\Y`¼ñvNïy]HS4S3p#-.t}+±Nk¼é%d%@M«9/²«J¡n}¢»_S\";\\gSéhf@§#Xk)×f¢2¡]>E_PDñ]éi:¼J³½³®XmTmïQX²(#<DFdïLnX¿UCCi3Qm9dT$wS§q³WS ³5P#yaayØS¹KW>¼#f9wharJ"
  ];

  const isCentralDomain = window.location.hostname === '20232026central321btk2025IN.kg';

  useEffect(() => {
    if (!isCentralDomain) {
      setShowCentralLogin(false);
      setCurrentUser(null);
      setCentralLoginStep(0);
      setCentralPasswords(['', '', '']);
      setCentralSuccess([false, false, false]);
    } else {
      setShowCentralLogin(true);
    }
  }, [isCentralDomain, location]);

  const handleLogin = (email: string, password: string) => {
    if (email === CENTRAL_ACCOUNT.email && password === 'centralpass') {
      setCurrentUser(CENTRAL_ACCOUNT);
    } else if (email === MAIN_ACCOUNT.email && password === 'adminpass') {
      setCurrentUser(MAIN_ACCOUNT);
    } else {
      setCurrentUser({
        id: 'user-' + Date.now(),
        email,
        isAdmin: false
      });
    }
    closeAuthModal();
  };

  const openLoginModal = () => {
    setAuthModal({ isOpen: true, mode: 'login' });
  };

  const openRegisterModal = () => {
    setAuthModal({ isOpen: true, mode: 'register' });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleCentralPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (centralPasswords[centralLoginStep] === CENTRAL_PASSWORDS[centralLoginStep]) {
      const nextSuccess = [...centralSuccess];
      nextSuccess[centralLoginStep] = true;
      setCentralSuccess(nextSuccess);
      if (centralLoginStep < 2) {
        setCentralLoginStep(centralLoginStep + 1);
      } else {
        setCurrentUser({
          id: 'central-admin',
          email: 'central@btk.kg',
          isAdmin: true,
          isCentral: true
        });
        setShowCentralLogin(false);
      }
    } else {
      alert('Неверный пароль!');
    }
  };

  const renderCentralLogin = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Вход для центрального аккаунта</h2>
        <form onSubmit={handleCentralPassword} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Пароль {centralLoginStep + 1} из 3
          </label>
          <input
            type="password"
            value={centralPasswords[centralLoginStep]}
            onChange={e => {
              const arr = [...centralPasswords];
              arr[centralLoginStep] = e.target.value;
              setCentralPasswords(arr);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
          >
            {centralLoginStep < 2 ? 'Далее' : 'Войти'}
          </button>
        </form>
        <div className="mt-4 flex gap-2">
          {centralSuccess.map((ok, idx) => (
            <span key={idx} className={`w-3 h-3 rounded-full ${ok ? 'bg-green-500' : 'bg-gray-300'}`}></span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header
        onLoginClick={openLoginModal}
        onRegisterClick={openRegisterModal}
      />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Departments />
              <News />
              {isCentralDomain && (
                <>
                  {showCentralLogin && !currentUser?.isCentral && renderCentralLogin()}
                  {currentUser?.isCentral && (
                    <UserManagement currentUser={currentUser} />
                  )}
                </>
              )}
            </>
          } />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </main>
      <AuthModal
        key={authModal.mode}
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialMode={authModal.mode}
      />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;