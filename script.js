/**
 * AutoFlowExpert - 業務自動化専門家ポートフォリオサイト
 * JavaScript機能
 */

// DOM要素の読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
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
    
    // ワークフローステップ
    initWorkflowSteps();
    
    // お客様の声スライダー
    initTestimonialSlider();
    
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
});

/**
 * ダークモード切り替え機能
 */
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const themeSwitchText = themeSwitch.querySelector('span');
    
    // ローカルストレージからテーマ設定を取得
    const savedTheme = localStorage.getItem('theme');
    
    // 保存されたテーマがあれば適用
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitchText.textContent = 'ライトモード';
    }
    
    // テーマ切り替えボタンのクリックイベント
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeSwitchText.textContent = 'ライトモード';
        } else {
            localStorage.setItem('theme', 'light');
            themeSwitchText.textContent = 'ダークモード';
        }
    });
}

/**
 * スキルバーのアニメーション
 */
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
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
        const sections = document.querySelectorAll('section');
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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * スクロール検出とヘッダー変更
 */
function initScrollDetection() {
    const header = document.querySelector('header');
    
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
        },
        project6: {
            title: '顧客管理システムと<br>Notionの連携',
            client: 'マーケティングコンサルタント',
            challenge: '顧客管理システム（CRM）とプロジェクト管理ツールが分離しており、情報の二重管理や不整合が発生していました。特にクライアントの最新状況をNotionのプロジェクト管理に反映する作業が煩雑でした。',
            solution: 'MakeとNotionのAPIを活用し、CRMの顧客情報や案件状況の変更を検知して、自動的にNotionデータベースに反映するシステムを構築しました。双方向の同期により、どちらのツールからでも最新情報を確認・更新できます。',
            tools: 'Make、Notion API、CRM API',
            results: '情報の二重管理がなくなり、週5時間の工数削減を実現。データの不整合もなくなり、クライアント対応の質が向上しました。プロジェクト進行の可視化も容易になり、納期遅延のリスクが低減しています。',
            testimonial: '「システム間の情報連携が自動化されたことで、常に最新情報に基づいた意思決定ができるようになりました。クライアント満足度も向上し、リピート案件が増えています。」',
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
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // スクロール再開
    });
    
    // モーダル外クリックで閉じる
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * ワークフローステップ
 */
function initWorkflowSteps() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const progressIndicator = document.querySelector('.progress-indicator');
    let currentStep = 0;
    
    // 初期状態
    updateWorkflowStep(currentStep);
    
    // 各ステップのクリックイベント
    workflowSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            currentStep = index;
            updateWorkflowStep(currentStep);
        });
    });
    
    // 自動切り替え（オプション）
    /*
    setInterval(() => {
        currentStep = (currentStep + 1) % workflowSteps.length;
        updateWorkflowStep(currentStep);
    }, 5000);
    */
    
    // ワークフローステップの更新
    function updateWorkflowStep(stepIndex) {
        workflowSteps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // プログレスバーの更新
        const progressPercentage = ((stepIndex + 1) / workflowSteps.length) * 100;
        progressIndicator.style.width = `${progressPercentage}%`;
    }
    
    // Intersection Observerでビューポートに入ったときに最初のステップをアクティブに
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateWorkflowStep(0);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.workflow-steps'));
}

/**
 * お客様の声スライダー
 */
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    
    // 初期状態
    updateTestimonial(currentIndex);
    
    // 前へボタン
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateTestimonial(currentIndex);
    });
    
    // 次へボタン
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateTestimonial(currentIndex);
    });
    
    // ドットクリック
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateTestimonial(currentIndex);
        });
    });
    
    // 自動切り替え
    let testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateTestimonial(currentIndex);
    }, 6000);
    
    // マウスオーバーで自動切り替え停止
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            updateTestimonial(currentIndex);
        }, 6000);
    });
    
    // テスティモニアル更新
    function updateTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

/**
 * ビフォー/アフタースライダー
 */
function initBenefitSlider() {
    const slider = document.getElementById('benefitSlider');
    const beforeElement = document.querySelector('.benefit-before');
    const afterElement = document.querySelector('.benefit-after');
    
    // スライダー値変更イベント
    slider.addEventListener('input', function() {
        const value = this.value;
        
        // ビフォー要素のスタイル変更
        beforeElement.style.opacity = (100 - value) / 100;
        beforeElement.style.transform = `scale(${0.9 + (100 - value) / 1000})`;
        
        // アフター要素のスタイル変更
        afterElement.style.opacity = value / 100;
        afterElement.style.transform = `scale(${0.9 + value / 1000})`;
    });
    
    // 初期値設定
    slider.value = 50;
    const event = new Event('input');
    slider.dispatchEvent(event);
}

/**
 * ROI計算機
 */
function initROICalculator() {
    const taskHoursInput = document.getElementById('taskHours');
    const hourlyRateInput = document.getElementById('hourlyRate');
    const automationCostInput = document.getElementById('automationCost');
    const calculateButton = document.getElementById('calculateROI');
    
    const savedHoursElement = document.getElementById('savedHours');
    const monthlySavingsElement = document.getElementById('monthlySavings');
    const roiPeriodElement = document.getElementById('roiPeriod');
    
    // 計算ボタンクリックイベント
    calculateButton.addEventListener('click', function() {
        // 入力値の取得
        const taskHours = parseFloat(taskHoursInput.value);
        const hourlyRate = parseFloat(hourlyRateInput.value);
        const automationCost = parseFloat(automationCostInput.value);
        
        // 月間削減時間（週間時間 × 4週）
        const monthlySavedHours = taskHours * 4;
        
        // 月間コスト削減（月間削減時間 × 時給）
        const monthlySavings = monthlySavedHours * hourlyRate;
        
        // 投資回収期間（自動化コスト ÷ 月間コスト削減）
        const roiPeriod = automationCost / monthlySavings;
        
        // 結果の表示
        savedHoursElement.textContent = monthlySavedHours.toFixed(0);
        monthlySavingsElement.textContent = monthlySavings.toLocaleString();
        roiPeriodElement.textContent = roiPeriod.toFixed(2);
        
        // 結果のアニメーション
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach(item => {
            item.classList.add('highlight');
            setTimeout(() => {
                item.classList.remove('highlight');
            }, 1000);
        });
    });
    
    // 初期計算を実行
    calculateButton.click();
}

/**
 * お問い合わせフォーム
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const formValues = {};
        
        for (const [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        
        // バリデーション
        let isValid = true;
        const requiredFields = ['name', 'email', 'subject', 'message'];
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            
            if (!formValues[field]) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        // メールアドレスの形式チェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formValues.email && !emailRegex.test(formValues.email)) {
            isValid = false;
            contactForm.querySelector('[name="email"]').classList.add('error');
        }
        
        if (!isValid) {
            alert('必須項目を入力してください。');
            return;
        }
        
        // 実際の送信処理（デモでは省略）
        alert('お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。');
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
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * 要素のフェードインアニメーション
 */
function initFadeInAnimation() {
    const fadeElements = document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}
