package com.oa.util;

public class PageQueryUtil implements java.io.Serializable, IPage {
	private int pageSize = 10; // 每页显示条数
	private int currentPage = 1;// 当前页
	private int totalPage;// 总共页数
	private int totalSize;// 总记录数
	private int showPageNum = 5;// 显示出来的页码数量
	private int start = 1;
	private int end = 1;

	public PageQueryUtil() {
		super();
	}

	public PageQueryUtil(int pageSize, int currentPage) {
		super();
		this.pageSize = pageSize;
		this.currentPage = currentPage;
	}

	public PageQueryUtil(int pageSize, int currentPage, int totalPage,
			int totalSize) {
		super();
		this.pageSize = pageSize;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		this.totalSize = totalSize;
	}

	/**
	 * 每页第一条记录码
	 * 
	 * @return
	 */
	public int getFirstResult() {
		return (currentPage - 1) * pageSize;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalPage() {
		this.totalPage = this.totalSize % this.pageSize == 0 ? this.totalSize
				/ this.pageSize : (this.totalSize / this.pageSize + 1);
		if (this.totalPage == 0) {
			this.totalPage = 1;
		}
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}

	public int getStart() {
		if (getCurrentPage() - showPageNum / 2 > 1) {
			if (getCurrentPage() + showPageNum / 2 <= getTotalPage()) {
				start = getCurrentPage() - showPageNum / 2;
			} else {
				start = getTotalPage() - showPageNum + 1;
			}
		} else {
			start = 1;
		}
		if ((getTotalPage() - start) < showPageNum) {
			start = getTotalPage() - showPageNum + 1;
		}
		if (start <= 0) {
			start = 1;
		}
		return this.start;
	}

	public int getEnd() {
		if (showPageNum < getTotalPage()) {
			end = start + showPageNum;
		}
		if ((getTotalPage() - start) < showPageNum) {
			end = totalPage + 1;
		}
		if (end > getTotalPage()) {
			end = getTotalPage() + 1;
		}
		return this.end;
	}
}
