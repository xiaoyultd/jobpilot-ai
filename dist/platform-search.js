(() => {
  'use strict';
  const records = {
    zhilian: [
      {names:['广电计量检测集团','广电计量检测集团股份有限公司','广电计量'], company:'广电计量', title:'计量销售工程师', salary:'薪资未公开', place:'广州·番禺', details:'1–3年 · 本科', url:'https://www.zhaopin.com/jobdetail/CC138044050J40795648812.htm', source:'智联职位详情'},
      {names:['广电计量检测集团','广电计量检测集团股份有限公司','广电计量'], company:'广电计量', title:'材料检测主管工程师（材料化学/技术支持）', salary:'1–1.5万元/月', place:'具体地点请查看企业页', details:'5–10年 · 本科', url:'https://www.zhaopin.com/companydetail/CC138044056.htm', source:'智联企业职位页'}
    ],
    boss: [
      {names:['广电计量检测集团','广电计量检测集团股份有限公司','广电计量'], company:'广电计量', title:'可靠性测试工程师（广州）', salary:'5–9K·13薪', place:'广州·番禺·石基', details:'1–3年 · 大专', url:'https://www.zhipin.com/job_detail/cf5d7414ba21c04e1XZ_2t-4GVJY.html', source:'BOSS职位详情（可能需要登录或验证）'}
    ],
    '51job': [
      {names:['广电计量检测集团','广电计量检测集团股份有限公司','广电计量'], company:'广电计量检测集团', title:'化学报告文员', salary:'5–7千元/月·13薪', place:'广州·番禺', details:'无需经验 · 本科', url:'https://mwenyuan.51job.com/guangzhou/', source:'前程无忧职位列表（可能更新，需在页面查找公司）'},
      {names:['广州邦禾检测技术有限公司','广州邦禾检测技术','广州邦禾'], company:'广州邦禾检测技术', title:'国际商务专员', salary:'8千–1.5万元/月', place:'广州·番禺', details:'无需经验 · 本科', url:'https://fanyi.51job.com/guangzhou/kouyi/', source:'前程无忧职位列表（可能更新，需在页面查找公司）'}
    ]
  };
  const homes={zhilian:'https://www.zhaopin.com/',boss:'https://www.zhipin.com/','51job':'https://www.51job.com/'};
  const normalize = value => value.trim().replace(/[\s（）()·]/g,'').toLowerCase();
  const datalist=document.getElementById('platformCompanies');
  (window.COMPANY_DIRECTORY || []).forEach(company => {const option=document.createElement('option');option.value=company.name;datalist.appendChild(option);});
  function line(tag, text, className) {const element=document.createElement(tag);element.textContent=text;if(className) element.className=className;return element;}
  function link(url,text) {const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=text+' ↗';return a;}
  document.querySelectorAll('.platform-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const query=form.elements.company.value.trim();
    const output=form.parentElement.querySelector('.platform-results');
    output.replaceChildren();
    if (!query) {output.appendChild(line('p','请先输入或选择企业名称。'));return;}
    const found=(records[form.dataset.platform] || []).filter(record => record.names.some(name => normalize(name)===normalize(query)));
    if (!found.length) {
      output.appendChild(line('p','这家企业暂无已整理的平台职位记录，不代表企业没有招聘。请核对企业全称，或到平台搜索企业名称。'));
      output.appendChild(link(homes[form.dataset.platform],'打开招聘平台，手动搜索企业'));
      return;
    }
    output.appendChild(line('p',`找到 ${found.length} 条该企业的历史线索，不能确认现在仍在招聘。`));
    found.forEach(record => {
      const card=document.createElement('article');
      card.appendChild(line('h3',record.title));
      card.appendChild(line('p',`${record.company} · ${record.place}`));
      card.appendChild(line('strong',`${record.salary}　${record.details}`));
      card.appendChild(line('p','整理日期：2026-10-31。来源为平台公开页面或搜索索引，岗位状态、薪资和单位需再次核实。','platform-note'));
      card.appendChild(link(record.url,record.source));
      output.appendChild(card);
    });
  }));
})();
