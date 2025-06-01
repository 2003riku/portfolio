/**
 * AutoFlowExpert - 業務自動化専門家ポートフォリオサイト
 * JavaScript機能 - 洗練されたUI/UX向け改善版
 */

// DOM要素の読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // システム設定のダークモード検出と適用
    initSystemThemeDetection();
    
    // ダークモード切り替え
    initThemeToggle();
    
    // スキルバーのアニメーション
    initSkillBars();
    
    // ナビゲーションメニュー（モバイル対応）
    initMobileNav();
    
    // スクロール検出とヘッダー変更
    initScrollDetection();
    
    // トップに戻るボタン
    initBackToTop();
    
    // ポートフォリオフィルター
    initPortfolioFilter();
    
    // ポートフォリオモーダル
    initPortfolioModal();
    
    // 自動化フローアニメーション
    initAutomationFlowAnimation();
    
    // ビフォー/アフタースライダー
    initBenefitSlider();
    
    // ROI計算機
    initROICalculator();
    
    // お問い合わせフォーム
    initContactForm();
    
    // スムーズスクロール
    initSmoothScroll();
    
    // 要素のフェードインアニメーション
    initFadeInAnimation();
    
    // ページ遷移アニメーション
    initPageTransitions();
});

/**
 * システム設定のダークモード検出と適用
 */
function initSystemThemeDetection() {
    // システムのダークモード設定を検出
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // システム設定がダークモードの場合、ダークモードを適用
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
        const themeSwitchText = document.querySelector('#theme-switch span');
        if (themeSwitchText) {
            themeSwitchText.textContent = 'ライトモード';
        }
    }
    
    // システム設定の変更を監視
    prefersDarkScheme.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            const themeSwitchText = document.querySelector('#theme-switch span');
            if (themeSwitchText) {
                themeSwitchText.textContent = 'ライトモード';
            }
        } else {
            document.body.classList.remove('dark-mode');
            const themeSwitchText = document.querySelector('#theme-switch span');
            if (themeSwitchText) {
                themeSwitchText.textContent = 'ダークモード';
            }
        }
    });
}

/**
 * ダークモード切り替え機能
 */
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;
    
    const themeSwitchText = themeSwitch.querySelector('span');
    
    // 現在のダークモード状態に合わせてテキスト更新
    if (document.body.classList.contains('dark-mode')) {
        themeSwitchText.textContent = 'ライトモード';
    }
    
    // テーマ切り替えボタンのクリックイベント
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeSwitchText.textContent = 'ライトモード';
        } else {
            themeSwitchText.textContent = 'ダークモード';
        }
    });
}

/**
 * スキルバーのアニメーション
 */
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    if (skillLevels.length === 0) return;
    
    // Intersection Observerを使用して画面に表示されたときにアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.style.width;
                
                // 一度リセットしてからアニメーション
                skillLevel.style.width = '0';
                
                // 少し遅延させてアニメーション
                setTimeout(() => {
                    skillLevel.style.width = width;
                }, 200);
                
                // 一度表示されたら監視を解除
                observer.unobserve(skillLevel);
            }
        });
    }, { threshold: 0.5 });
    
    // 各スキルバーを監視
    skillLevels.forEach(skillLevel => {
        observer.observe(skillLevel);
    });
}

/**
 * モバイルナビゲーション
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // メニューアイコンの切り替え
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // ナビゲーションリンクのクリックでメニューを閉じる
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // アクティブなナビゲーションリンクの設定
    window.addEventListener('scroll', function() {
        // ハッシュリンクがある場合のみ実行
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.includes('#' + current)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/**
 * スクロール検出とヘッダー変更
 */
function initScrollDetection() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * トップに戻るボタン
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ポートフォリオフィルター
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterButtons.length === 0 || portfolioItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * ポートフォリオモーダル
 */
function initPortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    if (!modal) return;
    
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');
    const detailButtons = document.querySelectorAll('.portfolio-details-btn');
    
    // プロジェクト詳細データ
    const projectDetails = {
        project1: {
            title: 'Googleカレンダーと<br>Notionデータベースの完全連携',
            client: '個人事業主（コンサルタント）',
            challenge: '複数のGoogleカレンダーの予定をNotionデータベースに自動で反映させ、プロジェクト管理と時間管理を一元化したいというニーズがありました。手動での転記作業に週3時間以上を費やしており、ミスも発生していました。',
            solution: 'Google Apps Scriptを使用して、指定したGoogleカレンダーの予定変更を検知し、Notion APIを通じてデータベースに自動反映するシステムを構築しました。カレンダーの予定タイトルから自動的にプロジェクトを判別し、適切なカテゴリ分けも行います。',
            tools: 'Google Apps Script、Notion API、Google Calendar API',
            results: '週3時間の手作業が完全に自動化され、データの正確性も向上しました。クライアントは時間管理とプロジェクト進行の可視化が容易になり、業務効率が約20%向上したと報告しています。',
            testimonial: '「カレンダーとNotionが連携したことで、時間の使い方が明確になり、プロジェクト管理が格段に楽になりました。もっと早く導入すればよかったです。」',
            image: 'https://via.placeholder.com/800x500'
        },
        project2: {
            title: 'ECサイトの<br>注文処理自動化',
            client: '中小規模のECサイト運営企業',
            challenge: 'WooCommerceで運営するECサイトの注文情報を、手作業でCRMシステムに入力し、在庫管理表を更新する作業が発生していました。日々の注文処理に2時間以上かかり、入力ミスによる顧客対応の問題も発生していました。',
            solution: 'MakeとWordPressのWebhookを連携し、新規注文が入るとCRMへの顧客情報登録、在庫管理スプレッドシートの更新、出荷指示書の自動生成までを自動化するワークフローを構築しました。',
            tools: 'Make (旧Integromat)、WordPress/WooCommerce API、Google Sheets API、CRM API',
            results: '注文処理時間が1日あたり2時間から数分に短縮され、入力ミスがゼロになりました。スタッフはより価値の高い顧客対応に時間を使えるようになり、顧客満足度が15%向上しました。',
            testimonial: '「注文処理の自動化により、スタッフの負担が大幅に軽減され、ミスもなくなりました。顧客対応の質が向上し、リピート率も上がっています。」',
            image: 'https://via.placeholder.com/800x500'
        },
        project3: {
            title: '月次レポート<br>自動生成システム',
            client: '広告代理店',
            challenge: '複数のマーケティングプラットフォームからデータを収集し、クライアント向けの月次レポートを作成する作業に、毎月2日間を費やしていました。データ収集と加工の手間が大きく、分析に十分な時間を割けない状況でした。',
            solution: 'Google Apps Scriptを使用して、各プラットフォームのAPIからデータを自動取得し、スプレッドシートで集計・加工した後、レポート用のスライドを自動生成するシステムを開発しました。',
            tools: 'Google Apps Script、Google Sheets、Google Slides、各種広告プラットフォームAPI',
            results: '2日間かかっていたレポート作成作業が30分程度に短縮され、データの正確性も向上しました。浮いた時間で深い分析が可能になり、クライアントへの提案力が強化されました。',
            testimonial: '「レポート作成の自動化により、データ収集から解放され、本来注力すべき分析と戦略立案に集中できるようになりました。クライアントからの評価も高まっています。」',
            image: 'https://via.placeholder.com/800x500'
        },
        project4: {
            title: '営業情報の<br>自動集約・通知システム',
            client: '不動産仲介会社',
            challenge: '複数の不動産ポータルサイトからの問い合わせや、自社サイトのお問い合わせフォームなど、情報の入口が分散しており、重要な問い合わせの見落としや対応遅延が発生していました。',
            solution: 'Makeを使用して各ポータルサイトのAPIと連携し、新規問い合わせを検知すると自動的にSlackの専用チャンネルに通知するシステムを構築。問い合わせ内容に応じて担当者へのメンション付きで通知する仕組みも実装しました。',
            tools: 'Make、Slack API、各種不動産ポータルサイトAPI、Webhook',
            results: '問い合わせの見落としがゼロになり、平均対応時間が3時間から30分に短縮されました。迅速な対応により成約率が15%向上し、売上増加に貢献しています。',
            testimonial: '「以前は問い合わせの確認のために複数のサイトをチェックする必要がありましたが、今はSlackだけを見れば全てわかります。営業活動に集中できるようになり、成果も上がっています。」',
            image: 'https://via.placeholder.com/800x500'
        },
        project5: {
            title: 'スプレッドシートから<br>WordPressへの自動投稿',
            client: 'コンテンツマーケティング会社',
            challenge: '多数のクライアントサイト向けに記事を作成し、WordPressに投稿する作業が発生していました。記事内容はスプレッドシートで管理されていましたが、WordPressへの投稿は手作業で行われており、時間がかかるだけでなく、フォーマットの崩れやミスも発生していました。',
            solution: 'Google Apps Scriptを使用して、スプレッドシートの内容をWordPressのREST APIを通じて自動投稿するシステムを開発。画像の挿入、カテゴリ設定、メタデータの追加なども自動化しました。',
            tools: 'Google Apps Script、WordPress REST API、Google Sheets',
            results: '1記事あたり15分かかっていた投稿作業が完全に自動化され、月間で約40時間の工数削減を実現。フォーマットの統一性も保たれ、品質が向上しました。',
            testimonial: '「記事投稿の手間から解放され、コンテンツの質向上に集中できるようになりました。クライアントからの評価も上がり、契約更新率が向上しています。」',
            image: 'https://via.placeholder.com/800x500'
        }
    };
    
    // 詳細ボタンのクリックイベント
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-id');
            const project = projectDetails[projectId];
            
            // モーダル内容の生成
            modalBody.innerHTML = `
                <div class="project-detail">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-info">
                        <h2>${project.title}</h2>
                        <div class="project-meta">
                            <div class="meta-item">
                                <h4>クライアント</h4>
                                <p>${project.client}</p>
                            </div>
                            <div class="meta-item">
                                <h4>使用ツール</h4>
                                <p>${project.tools}</p>
                            </div>
                        </div>
                        <div class="project-section">
                            <h3>課題</h3>
                            <p>${project.challenge}</p>
                        </div>
                        <div class="project-section">
                            <h3>ソリューション</h3>
                            <p>${project.solution}</p>
                        </div>
                        <div class="project-section">
                            <h3>成果</h3>
                            <p>${project.results}</p>
                        </div>
                        <div class="project-testimonial">
                            <div class="quote-icon">
                                <i class="fas fa-quote-left"></i>
                            </div>
                            <p>${project.testimonial}</p>
                        </div>
                    </div>
                </div>
            `;
            
            // モーダルを表示
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // スクロール防止
            
            // モーダル内の画像読み込み完了後にスタイル調整
            const modalImage = modalBody.querySelector('.project-image img');
            modalImage.onload = function() {
                modalBody.style.opacity = '1';
            };
        });
    });
    
    // モーダルを閉じる
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // スクロール再開
        });
    }
    
    // モーダル外クリックで閉じる
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * 自動化フローアニメーション
 */
function initAutomationFlowAnimation() {
    const automationGraphic = document.querySelector('.automation-graphic');
    if (!automationGraphic) return;
    
    // データフロー要素を追加
    const dataFlow1 = document.createElement('div');
    dataFlow1.className = 'data-flow data-flow-1';
    automationGraphic.appendChild(dataFlow1);
    
    const dataFlow2 = document.createElement('div');
    dataFlow2.className = 'data-flow data-flow-2';
    automationGraphic.appendChild(dataFlow2);
    
    // ノードのホバーエフェクト強化
    const nodes = automationGraphic.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            // ノードの説明テキストを表示
            const nodeInfo = document.createElement('div');
            nodeInfo.className = 'node-info';
            
            let infoText = '';
            if (node.classList.contains('node-1')) {
                infoText = 'データ入力: 様々なソースからのデータを収集';
            } else if (node.classList.contains('node-2')) {
                infoText = '自動処理: AIによるデータ分析と処理';
            } else if (node.classList.contains('node-3')) {
                infoText = '結果出力: レポート生成と自動配信';
            }
            
            nodeInfo.textContent = infoText;
            node.appendChild(nodeInfo);
            
            // アニメーション一時停止
            document.querySelectorAll('.data-flow').forEach(flow => {
                flow.style.animationPlayState = 'paused';
            });
        });
        
        node.addEventListener('mouseleave', function() {
            // ノードの説明テキストを削除
            const nodeInfo = node.querySelector('.node-info');
            if (nodeInfo) {
                node.removeChild(nodeInfo);
            }
            
            // アニメーション再開
            document.querySelectorAll('.data-flow').forEach(flow => {
                flow.style.animationPlayState = 'running';
            });
        });
    });
    
    // Intersection Observerでビューポートに入ったときにアニメーション開始
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // データフローアニメーションを開始
                dataFlow1.style.animation = 'flowAnimation1 3s infinite';
                
                // 少し遅延させて2つ目のフローを開始
                setTimeout(() => {
                    dataFlow2.style.animation = 'flowAnimation2 3s infinite';
                }, 1500);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(automationGraphic);
}

/**
 * ビフォー/アフタースライダー
 */
function initBenefitSlider() {
    const slider = document.getElementById('benefitSlider');
    if (!slider) return;
    
    const benefitBefore = document.querySelector('.benefit-before');
    const benefitAfter = document.querySelector('.benefit-after');
    
    slider.addEventListener('input', function() {
        const value = this.value;
        
        // スライダーの値に応じてビフォー/アフターの表示を調整
        benefitBefore.style.opacity = (100 - value) / 100;
        benefitAfter.style.opacity = value / 100;
        
        // 3D効果を追加
        benefitBefore.style.transform = `scale(${(100 - value) / 100 * 0.2 + 0.8})`;
        benefitAfter.style.transform = `scale(${value / 100 * 0.2 + 0.8})`;
    });
}

/**
 * ROI計算機
 */
function initROICalculator() {
    const calculateROI = document.getElementById('calculateROI');
    if (!calculateROI) return;
    
    calculateROI.addEventListener('click', function() {
        const taskHours = parseFloat(document.getElementById('taskHours').value);
        const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
        const automationCost = parseFloat(document.getElementById('automationCost').value);
        
        // 値のバリデーション
        if (isNaN(taskHours) || isNaN(hourlyRate) || isNaN(automationCost)) {
            alert('すべての項目に数値を入力してください');
            return;
        }
        
        // 計算
        const savedHours = taskHours * 4; // 月間削減時間（週あたり時間 × 4週）
        const monthlySavings = savedHours * hourlyRate; // 月間コスト削減
        const roiPeriod = automationCost / monthlySavings; // 投資回収期間（月）
        
        // 結果を表示
        document.getElementById('savedHours').textContent = savedHours.toFixed(0);
        document.getElementById('monthlySavings').textContent = monthlySavings.toLocaleString();
        document.getElementById('roiPeriod').textContent = roiPeriod.toFixed(2);
        
        // 結果表示のアニメーション
        const resultItems = document.querySelectorAll('.result-item strong');
        resultItems.forEach(item => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'fadeInUp 0.5s forwards';
            }, 10);
        });
    });
}

/**
 * お問い合わせフォーム
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームのバリデーション
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('必須項目をすべて入力してください');
            return;
        }
        
        // メール形式のバリデーション
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('有効なメールアドレスを入力してください');
            return;
        }
        
        // 送信成功メッセージ（実際の送信処理は別途サーバーサイドで実装）
        alert('お問い合わせありがとうございます。内容を確認の上、48時間以内にご返信いたします。');
        contactForm.reset();
    });
}

/**
 * スムーズスクロール
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // 現在のページにそのIDが存在する場合のみスクロール処理
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 要素のフェードインアニメーション
 */
function initFadeInAnimation() {
    // アニメーション対象の要素
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .about-text, .hero-content, .hero-image');
    
    // Intersection Observerを使用して画面に表示されたときにアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // 各要素を監視
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

/**
 * ページ遷移アニメーション
 */
function initPageTransitions() {
    // 外部リンク（ハッシュリンクを除く）のクリックイベント
    const externalLinks = document.querySelectorAll('a:not([href^="#"])');
    const pageTransition = document.querySelector('.page-transition');
    
    if (!pageTransition) return;
    
    externalLinks.forEach(link => {
        // 同じドメイン内のリンクのみ処理
        if (link.hostname === window.location.hostname && !link.getAttribute('target')) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // ハッシュリンクや空リンクは除外
                if (href && href !== '#' && !href.startsWith('#')) {
                    e.preventDefault();
                    
                    // 遷移アニメーション
                    pageTransition.classList.add('active');
                    
                    // アニメーション完了後に遷移
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            });
        }
    });
    
    // ページ読み込み時の遷移アニメーション（入場）
    window.addEventListener('load', function() {
        pageTransition.classList.add('exit');
        
        setTimeout(() => {
            pageTransition.classList.remove('exit');
            pageTransition.classList.remove('active');
        }, 500);
    });
}

// サービスカードのクリックイベント
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            let targetUrl;
            
            // カード内のリンクがあればそのURLを使用
            const cardLink = card.querySelector('a');
            if (cardLink) {
                targetUrl = cardLink.getAttribute('href');
            } else {
                // インデックスに基づいてURLを設定
                switch(index) {
                    case 0:
                        targetUrl = 'services.html';
                        break;
                    case 1:
                        targetUrl = 'services-make.html';
                        break;
                    case 2:
                        targetUrl = 'services-notion.html';
                        break;
                    case 3:
                        targetUrl = 'services-consulting.html';
                        break;
                    default:
                        targetUrl = 'services.html';
                }
            }
            
            // 遷移アニメーション
            const pageTransition = document.querySelector('.page-transition');
            if (pageTransition) {
                pageTransition.classList.add('active');
                
                // アニメーション完了後に遷移
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500);
            } else {
                window.location.href = targetUrl;
            }
        });
    });
    
    // ポートフォリオカードのクリックイベント
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 詳細ボタンのクリックは除外（モーダル表示のため）
            if (!e.target.closest('.portfolio-details-btn')) {
                const detailsBtn = card.querySelector('.portfolio-details-btn');
                if (detailsBtn) {
                    detailsBtn.click();
                }
            }
        });
    });
    
    // ブログカードのクリックイベント
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // リンク要素のクリックは通常の動作を維持
            if (!e.target.closest('a')) {
                let targetUrl;
                
                // カード内のリンクがあればそのURLを使用
                const cardLink = card.querySelector('a.read-more');
                if (cardLink) {
                    targetUrl = cardLink.getAttribute('href');
                } else {
                    // インデックスに基づいてURLを設定
                    targetUrl = `blog-${index + 1}.html`;
                }
                
                // 遷移アニメーション
                const pageTransition = document.querySelector('.page-transition');
                if (pageTransition) {
                    pageTransition.classList.add('active');
                    
                    // アニメーション完了後に遷移
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 500);
                } else {
                    window.location.href = targetUrl;
                }
            }
        });
    });
});
