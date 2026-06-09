---
title: Publications
date: 2026-06-09 10:00:00
banner:
  banner_text: Selected papers and preprints
---

<p class="pub-note">* denotes equal contribution.</p>

## 2026

<div class="pub-item">
<div class="pub-title"><a href="https://arxiv.org/abs/2605.17887">Attention Sinks and Outliers in Attention Residuals</a></div>
<div class="pub-meta">Haozheng Luo, <a class="pub-me" href="/">Haoran Dai</a>, Shaoyang Zhang, Xi Chen, Eric Hanchen Jiang, Yijiang Li, Jingyuan Huang, Chenghao Qiu, Chenwei Xu, Zhenyu Pan, Haotian Zhang, Binghui Wang, Yan Chen</div>
<div class="pub-venue">arXiv preprint, 2026</div>
<div class="pub-tldr">OASIS suppresses attention sinks and activation outliers in attention-residual transformers, improving inference stability and quantization robustness.</div>
<div class="pub-abstract">We propose OASIS, an outlier- and sink-aware technique built on inter-layer null signaling. As AttnResidual architectures introduce an additional depth-wise normalization channel, they improve inter-layer routing flexibility but also exacerbate attention sinks, activation outliers, and the resulting degradation in inference stability and quantization robustness. OASIS addresses this issue by introducing a Softmax1-based null space and coupling token-level null evidence to depth routing through an inter-layer null signal, thereby reducing sink-dominated routing and improving structural robustness. Theoretically, we show that the dual-normalization design of AttnResidual intensifies sink formation and quantization brittleness. Experimentally, we compare OASIS against five baselines on three real-world datasets and observe consistent improvements in both attention sink and post-quantization performance. Notably, OASIS achieves an average reduction of 9.26% in maximum infinity norm and 2.60% in average kurtosis across the evaluated settings, while lowering perplexity by 75.85% under W8A8 and improving GSM8K Pass@1 by 12.42% under W4A4.</div>
</div>

<div class="pub-item">
<div class="pub-title"><a href="https://iclr.cc/virtual/2026/10013309">TIDES: Test-time Inference Drift Exploitation via Scaling</a></div>
<div class="pub-meta"><a class="pub-me" href="/">Haoran Dai</a>, Haozheng Luo, Haotian Zhang, Meng Lin, Yan Chen, Binghui Wang</div>
<div class="pub-venue">ICLR 2026 Workshop on Efficient Spatial Reasoning (poster)</div>
<div class="pub-tldr">A reasoning attack exposing a failure mode of test-time scaling: extending reasoning depth degrades accuracy rather than improving it.</div>
<div class="pub-abstract">We propose TIDES, a reasoning-attacking method that exposes a previously unrecognized failure of test-time scaling: as reasoning traces lengthen, model performance degrades sharply rather than improves. Unlike prior attacks on large reasoning models (LRMs), TIDES exploits the intrinsic properties of test-time scaling laws to manipulate reasoning trace length, producing degradations that are inherently difficult to detect. Methodologically, we define Depth-Guided Latent Tracker (DLT), a depth-based tracker that injects microscopic steering vectors into intermediate reasoning traces stealthily and combines them with on-policy distillation to precisely position LRMs under test-time scaling. Theoretically, we model latent space as a depth-indexed dynamic process and prove that under test-time scaling, small bounded perturbations introduced at intermediate layers induce non-vanishing trajectory drift, explaining why DLT remains effective yet difficult to detect in large reasoning models. Empirically, we evaluate TIDES on multiple reasoning benchmarks using two strong reasoning models, DeepSeek-R1-Distill-Qwen-7B and DeepSeek-R1-Distill-Llama-8B, where it consistently outperforms state-of-the-art reasoning attack methods such as DecepChain and BadChain, delivering an average 30.3% improvement in attack performance over the baselines.</div>
</div>

<div class="pub-item">
<div class="pub-title"><a href="https://arxiv.org/abs/2603.06508">When One Modality Rules Them All: Backdoor Modality Collapse in Multimodal Diffusion Models</a></div>
<div class="pub-meta">Qitong Wang*, <a class="pub-me" href="/">Haoran Dai</a>*, Haotian Zhang, Christopher Rasmussen, Binghui Wang</div>
<div class="pub-venue">ICLR 2026 Workshop on Principled Design for Trustworthy AI</div>
<div class="pub-tldr">Reveals "modality collapse" in multimodal diffusion backdoors: poisoning several modalities makes one dominate rather than reinforcing the attack.</div>
<div class="pub-abstract">While diffusion models have revolutionized visual content generation, their rapid adoption has underscored the critical need to investigate vulnerabilities, e.g., to backdoor attacks. In multimodal diffusion models, it is natural to expect that attacking multiple modalities simultaneously (e.g., text and image) would yield complementary effects and strengthen the overall backdoor. In this paper, we challenge this assumption by investigating the phenomenon of Backdoor Modality Collapse, a scenario where the backdoor mechanism degenerates to rely predominantly on a subset of modalities, rendering others redundant. To rigorously quantify this behavior, we introduce two novel metrics: Trigger Modality Attribution (TMA) and Cross-Trigger Interaction (CTI). Through extensive experiments across diverse training configurations in multimodal conditional diffusion, we consistently observe a "winner-takes-all" dynamic in backdoor behavior. Our results reveal that (1) attacks often collapse into subset-modality dominance, and (2) cross-modal interaction is negligible or even negative, contradicting the intuition of synergistic vulnerability. These findings highlight a critical blind spot in current assessments, suggesting that high attack success rates often mask a fundamental reliance on a subset of modalities. This establishes a principled foundation for mechanistic analysis and future defense development.</div>
</div>

<div class="pub-item">
<div class="pub-title"><a href="https://arxiv.org/abs/2603.29852">VectorGym: A Multitask Benchmark for SVG Code Generation, Sketching, and Editing</a></div>
<div class="pub-meta">Juan Rodriguez, Haotian Zhang, Abhay Puri, Tianyang Zhang, Rishav Pramanik, Meng Lin, Xiaoqing Xie, Marco Terral, <a class="pub-me" href="/">Haoran Dai</a>, Darsh Kaushik, Aly Shariff, Perouz Taslakian, Spandana Gella, Sai Rajeswar, David Vazquez, Christopher Pal, Marco Pedersoli</div>
<div class="pub-venue">arXiv preprint, 2026</div>
<div class="pub-tldr">A multi-task benchmark for SVG generation, sketching, editing, and captioning, with a multi-task reinforcement-learning method on rendering-based rewards.</div>
<div class="pub-abstract">We introduce VectorGym, a comprehensive benchmark suite for Scalable Vector Graphics (SVG) that spans generation from text and sketches, complex editing, and visual understanding. VectorGym addresses the lack of realistic, challenging benchmarks aligned with professional design workflows. Our benchmark comprises four tasks with expert human-authored annotations: the novel Sketch2SVG task (VG-Sketch); a new SVG editing dataset (VG-Edit) featuring complex, multi-step edits with higher-order primitives; Text2SVG generation (VG-Text); and SVG captioning (VG-Cap). We also propose a multi-task reinforcement learning approach that jointly optimizes across all four tasks using rendering-based rewards. Our method, built on GRPO with curriculum learning, trains a Qwen3-VL 8B model that achieves state-of-the-art performance among open-source models, surpassing much larger models including Qwen3-VL 235B and matching GPT-4o.</div>
</div>

<div class="pub-item">
<div class="pub-title"><a href="https://arxiv.org/abs/2602.21416">WildSVG: Towards Reliable SVG Generation Under Real-World Conditions</a></div>
<div class="pub-meta">Marco Terral, Haotian Zhang, Tianyang Zhang, Meng Lin, Xiaoqing Xie, <a class="pub-me" href="/">Haoran Dai</a>, Darsh Kaushik, Pai Peng, Nicklas Scharpff, David Vazquez, Joan Rodriguez</div>
<div class="pub-venue">arXiv preprint, 2026</div>
<div class="pub-tldr">A benchmark for extracting scalable vector graphics from real images, where noise, clutter, and domain shift break current multimodal models.</div>
<div class="pub-abstract">We introduce the task of SVG extraction, which consists in translating specific visual inputs from an image into scalable vector graphics. Existing multimodal models achieve strong results when generating SVGs from clean renderings or textual descriptions, but they fall short in real-world scenarios where natural images introduce noise, clutter, and domain shifts. A central challenge in this direction is the lack of suitable benchmarks. To address this need, we introduce the WildSVG Benchmark, formed by two complementary datasets: Natural WildSVG, built from real images containing company logos paired with their SVG annotations, and Synthetic WildSVG, which blends complex SVG renderings into real scenes to simulate difficult conditions. We benchmark state-of-the-art multimodal models and find that current approaches perform well below what is needed for reliable SVG extraction in real scenarios.</div>
</div>

## 2025

<div class="pub-item">
<div class="pub-title"><a href="https://arxiv.org/abs/2508.01605">Practical, Generalizable and Robust Backdoor Attacks on Text-to-Image Diffusion Models</a></div>
<div class="pub-meta"><a class="pub-me" href="/">Haoran Dai</a>, Jiawen Wang, Ruo Yang, Manali Sharma, Zhonghao Liao, Yuan Hong, Binghui Wang</div>
<div class="pub-venue">arXiv preprint, 2025</div>
<div class="pub-tldr">A backdoor attack on text-to-image diffusion models that uses natural, readable prompts, transfers across models, and evades current defenses.</div>
<div class="pub-abstract">Text-to-image diffusion models (T2I DMs) have achieved remarkable success in generating high-quality and diverse images from text prompts, yet recent studies have revealed their vulnerability to backdoor attacks. Existing attack methods suffer from critical limitations: 1) they rely on unnatural adversarial prompts that lack human readability and require massive poisoned data; 2) their effectiveness is typically restricted to specific models, lacking generalizability; and 3) they can be mitigated by recent backdoor defenses. To overcome these challenges, we propose a novel backdoor attack framework that achieves three key properties: 1) Practicality: our attack requires only a few stealthy backdoor samples to generate arbitrary attacker-chosen target images, while ensuring high-quality image generation in benign scenarios. 2) Generalizability: the attack is applicable across multiple T2I DMs without requiring model-specific redesign. 3) Robustness: the attack remains effective against existing backdoor defenses and adaptive defenses. Our extensive experimental results on multiple T2I DMs demonstrate that with only 10 carefully crafted backdoored samples, our attack method achieves over 90% attack success rate with negligible degradation in benign image generation quality. We also conduct human evaluation to validate our attack effectiveness. Recent backdoor detection and mitigation methods, as well as adaptive defenses tailored to our attack, are not sufficiently effective, highlighting the pressing need for more robust defense mechanisms.</div>
</div>

## 2024

<div class="pub-item">
<div class="pub-title"><a href="https://link.springer.com/article/10.1186/s42400-024-00279-9">EvilPromptFuzzer: Generating Inappropriate Content Based on Text-to-Image Models</a></div>
<div class="pub-meta">Juntao He, <a class="pub-me" href="/">Haoran Dai</a>, Runqi Sui, Xuejing Yuan, Dun Liu, Hao Feng, Xinyue Liu, Wenchuan Yang, Baojiang Cui, Kedan Li</div>
<div class="pub-venue">Cybersecurity, vol. 7, article 70, 2024</div>
<div class="pub-tldr">A fuzzing method that automatically finds prompts driving text-to-image models to generate inappropriate content.</div>
<div class="pub-abstract">Text-to-image (TTI) models provide huge innovation ability for many industries, while the content security triggered by them has also attracted wide attention. Considerable research has focused on content security threats of large language models (LLMs), yet comprehensive studies on the content security of TTI models are notably scarce. This paper introduces a systematic tool, named EvilPromptFuzzer, designed to fuzz evil prompts in TTI models. For 15 kinds of fine-grained risks, EvilPromptFuzzer employs the strong knowledge-mining ability of LLMs to construct seed banks, in which the seeds cover various types of characters, interrelations, actions, objects, expressions, body parts, locations, surroundings, etc. Subsequently, these seeds are fed into the LLMs to build scene-diverse prompts, which can weaken the semantic sensitivity related to the fine-grained risks. Hence, the prompts can bypass the content audit mechanism of the TTI model, and ultimately help to generate images with inappropriate content. For the risks of violence, horrible, disgusting, animal cruelty, religious bias, political symbol, and extremism, the efficiency of EvilPromptFuzzer for generating inappropriate images based on DALL-E 3 is greater than 30%, namely, more than 30 generated images are malicious among 100 prompts. Specifically, the efficiency of horrible, disgusting, political symbols, and extremism reaches up to 58%, 64%, 71%, and 50%, respectively. Additionally, we analyzed the vulnerability of existing popular content audit platforms, including Amazon, Google, Azure, and Baidu. Even the most effective Google SafeSearch cloud platform identifies only 33.85% of malicious images across three distinct categories.</div>
</div>

## 2023

<div class="pub-item">
<div class="pub-title"><a href="https://arxiv.org/abs/2307.03425">Registration-Free Hybrid Learning Empowers Simple Multimodal Imaging System for High-quality Fusion Detection</a></div>
<div class="pub-meta">Yinghan Guan, <a class="pub-me" href="/">Haoran Dai</a>, Zekuan Yu, Shouyu Wang, Yuanjie Gu</div>
<div class="pub-venue">arXiv preprint, 2023</div>
<div class="pub-tldr">IA-VFDnet, a CNN-Transformer hybrid that performs infrared-aware visible fusion detection on unregistered images, applied to smoke and wildfire detection.</div>
<div class="pub-abstract">Multimodal fusion detection always places high demands on the imaging system and image pre-processing, while either a high-quality pre-registration system or image registration processing is costly. Unfortunately, the existing fusion methods are designed for registered source images, and the fusion of inhomogeneous features, which denotes a pair of features at the same spatial location that expresses different semantic information, cannot achieve satisfactory performance via these methods. As a result, we propose IA-VFDnet, a CNN-Transformer hybrid learning framework with a unified high-quality multimodal feature matching module (AKM) and a fusion module (WDAF), which work in synergy to perform high-quality infrared-aware visible fusion detection that can be applied to smoke and wildfire detection. Experiments on the M3FD dataset validate the superiority of the proposed method, and the first unregistered multimodal smoke and wildfire detection benchmark is openly available.</div>
</div>

<div class="pub-item">
<div class="pub-title"><a href="https://doi.org/10.1117/1.oe.62.8.083101">Physics-driven Deep Retinex Fusion for Adaptive Infrared and Visible Image Fusion</a></div>
<div class="pub-meta">Yuanjie Gu, Zhibo Xiao, Yinghan Guan, <a class="pub-me" href="/">Haoran Dai</a>, Cheng Liu, Liang Xue, Shouyu Wang</div>
<div class="pub-venue">Optical Engineering, 2023</div>
<div class="pub-tldr">A physics-driven, Retinex-based deep model that adaptively fuses infrared and visible images.</div>
</div>

## 2022

<div class="pub-item">
<div class="pub-title"><a href="https://doi.org/10.1117/1.oe.61.12.123103">Deep Fusion Prior for Plenoptic Super-resolution All-in-focus Imaging</a></div>
<div class="pub-meta">Yuanjie Gu, Yinghan Guan, Zhibo Xiao, <a class="pub-me" href="/">Haoran Dai</a>, Cheng Liu, Shouyu Wang</div>
<div class="pub-venue">Optical Engineering, 2022</div>
<div class="pub-tldr">A deep fusion prior for plenoptic super-resolution that reconstructs high-resolution all-in-focus images.</div>
</div>

## 2021

<div class="pub-item">
<div class="pub-title"><a href="https://doi.org/10.1109/aiid51893.2021.9456576">RDUnet-A: A Deep Neural Network Method with Attention for Fabric Defect Segmentation Based on Autoencoder</a></div>
<div class="pub-meta">Huaijing Chen, Dengke Chen, <a class="pub-me" href="/">Haoran Dai</a></div>
<div class="pub-venue">IEEE AIID 2021</div>
<div class="pub-tldr">An attention-augmented autoencoder (RDUnet-A) that automatically segments fabric defects, reducing the errors of manual inspection.</div>
<div class="pub-abstract">In industrial production, fabric products inevitably show flaws due to uncontrollable factors such as production and transportation. However, there are many problems with the manual inspection methods used by manufacturers, such as low efficiency, a high false-detection rate, and a high missed-detection rate.</div>
</div>
